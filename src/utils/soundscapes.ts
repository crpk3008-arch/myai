export type SoundscapeId = 'lunar-vacuum' | 'martian-wind' | 'deep-cosmos';

export interface AmbientSoundscape {
  id: SoundscapeId;
  name: string;
  realm: string;
  description: string;
  baseFreqHz: number;
  harmonicFreqHz: number;
  filterCutoffHz: number;
  noiseLevel: number;
  lfoRateHz: number;
  accent: 'cyan' | 'amber' | 'emerald';
}

export const AMBIENT_SOUNDSCAPES: AmbientSoundscape[] = [
  {
    id: 'lunar-vacuum',
    name: 'Lunar Silence',
    realm: 'Moon',
    description: 'Low electrostatic hum and soft crystalline shimmer.',
    baseFreqHz: 58,
    harmonicFreqHz: 87,
    filterCutoffHz: 320,
    noiseLevel: 0.08,
    lfoRateHz: 0.09,
    accent: 'cyan',
  },
  {
    id: 'martian-wind',
    name: 'Martian Dust Wind',
    realm: 'Mars',
    description: 'Filtered CO₂ wind sweeps across iron-oxide dunes.',
    baseFreqHz: 73.4,
    harmonicFreqHz: 110,
    filterCutoffHz: 540,
    noiseLevel: 0.28,
    lfoRateHz: 0.16,
    accent: 'amber',
  },
  {
    id: 'deep-cosmos',
    name: 'Heliopause Void',
    realm: 'Interstellar',
    description: 'Deep plasma resonance and interstellar background wash.',
    baseFreqHz: 48,
    harmonicFreqHz: 96,
    filterCutoffHz: 260,
    noiseLevel: 0.14,
    lfoRateHz: 0.06,
    accent: 'emerald',
  },
];

export function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 0.35;
  return Math.min(1, Math.max(0, Math.round(value * 100) / 100));
}

export function formatVolumePercent(value: number): string {
  return `${Math.round(clampVolume(value) * 100)}%`;
}

export function getSoundscapeById(id: SoundscapeId): AmbientSoundscape {
  return AMBIENT_SOUNDSCAPES.find((item) => item.id === id) ?? AMBIENT_SOUNDSCAPES[0];
}

export function getNextSoundscapeId(currentId: SoundscapeId): SoundscapeId {
  const index = AMBIENT_SOUNDSCAPES.findIndex((item) => item.id === currentId);
  if (index === -1) return AMBIENT_SOUNDSCAPES[0].id;
  return AMBIENT_SOUNDSCAPES[(index + 1) % AMBIENT_SOUNDSCAPES.length].id;
}

export class SpaceSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private droneOscA: OscillatorNode | null = null;
  private droneOscB: OscillatorNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtor();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private teardownNodes(): void {
    const nodes: Array<{ stop?: () => void; disconnect: () => void } | null> = [
      this.droneOscA,
      this.droneOscB,
      this.lfoOsc,
      this.noiseSource,
      this.lfoGain,
      this.noiseGain,
      this.filter,
      this.masterGain,
    ];

    for (const node of nodes) {
      if (!node) continue;
      try {
        node.stop?.();
      } catch {
        // Ignore already-stopped nodes
      }
      try {
        node.disconnect();
      } catch {
        // Ignore already-disconnected nodes
      }
    }

    this.droneOscA = null;
    this.droneOscB = null;
    this.lfoOsc = null;
    this.lfoGain = null;
    this.noiseSource = null;
    this.noiseGain = null;
    this.filter = null;
    this.masterGain = null;
  }

  start(soundscape: AmbientSoundscape, volume: number): void {
    try {
      const ctx = this.ensureContext();
      if (!ctx) return;
      this.teardownNodes();

      const now = ctx.currentTime;
      const safeVol = clampVolume(volume);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(safeVol * 0.22, now + 0.4);
      masterGain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = soundscape.id === 'martian-wind' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(soundscape.filterCutoffHz, now);
      filter.Q.setValueAtTime(soundscape.id === 'martian-wind' ? 1.4 : 0.7, now);
      filter.connect(masterGain);

      // Dual-detuned sub-harmonic pads
      const oscA = ctx.createOscillator();
      oscA.type = 'sine';
      oscA.frequency.setValueAtTime(soundscape.baseFreqHz, now);

      const oscB = ctx.createOscillator();
      oscB.type = soundscape.id === 'deep-cosmos' ? 'triangle' : 'sine';
      oscB.frequency.setValueAtTime(soundscape.harmonicFreqHz, now);
      oscB.detune.setValueAtTime(4, now);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.45, now);

      oscA.connect(padGain);
      oscB.connect(padGain);
      padGain.connect(filter);

      // Slow LFO modulating filter cutoff for organic drift
      const lfoOsc = ctx.createOscillator();
      lfoOsc.type = 'sine';
      lfoOsc.frequency.setValueAtTime(soundscape.lfoRateHz, now);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(soundscape.id === 'martian-wind' ? 220 : 80, now);
      lfoOsc.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Filtered noise buffer for subtle cosmic wash / Martian wind
      const bufferSize = Math.floor(ctx.sampleRate * 2);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const channelData = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i += 1) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.04 * white) / 1.04;
        channelData[i] = lastOut * 2.5;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(soundscape.noiseLevel, now);

      noiseSource.connect(noiseGain);
      noiseGain.connect(filter);

      oscA.start(now);
      oscB.start(now);
      lfoOsc.start(now);
      noiseSource.start(now);

      this.masterGain = masterGain;
      this.filter = filter;
      this.droneOscA = oscA;
      this.droneOscB = oscB;
      this.lfoOsc = lfoOsc;
      this.lfoGain = lfoGain;
      this.noiseSource = noiseSource;
      this.noiseGain = noiseGain;
    } catch {
      // Gracefully degrade if browser restricts or lacks Web Audio
    }
  }

  setVolume(volume: number): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      const safeVol = clampVolume(volume);
      this.masterGain.gain.setTargetAtTime(safeVol * 0.22, this.ctx.currentTime, 0.08);
    } catch {
      // Ignore audio update errors
    }
  }

  stop(): void {
    if (!this.ctx || !this.masterGain) {
      this.teardownNodes();
      return;
    }
    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.08);
      window.setTimeout(() => {
        this.teardownNodes();
      }, 180);
    } catch {
      this.teardownNodes();
    }
  }

  dispose(): void {
    this.teardownNodes();
    if (this.ctx) {
      void this.ctx.close().catch(() => undefined);
      this.ctx = null;
    }
  }
}
