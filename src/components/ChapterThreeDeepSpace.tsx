import React, { useEffect, useRef, useState } from 'react';
import { Disc3, Pause, Play, Radio, Volume2 } from 'lucide-react';
import { FLEET_PROBES, GOLDEN_RECORD_TRACKS, ReadingMode } from '../data/relicsData';
import { DecadeFilter, getMatchingDossiersForDecade } from '../utils/timeline';
import { VoyagerInterstellarPlate } from './RelicPlates';

interface ChapterThreeDeepSpaceProps {
  readingMode: ReadingMode;
  selectedDecade?: DecadeFilter;
}

export const ChapterThreeDeepSpace: React.FC<ChapterThreeDeepSpaceProps> = ({
  readingMode,
  selectedDecade = 'all',
}) => {
  const [selectedProbeId, setSelectedProbeId] = useState<string>('voyager-1');
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [isPlayingRecord, setIsPlayingRecord] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const matchingDossiers = getMatchingDossiersForDecade(selectedDecade);
  const showVoyagerDossier = matchingDossiers.has('voyager');
  const showGoldenRecordDossier = matchingDossiers.has('golden-record');
  const showFleetMatrix =
    selectedDecade === 'all' ||
    matchingDossiers.has('pioneer') ||
    matchingDossiers.has('voyager') ||
    matchingDossiers.has('golden-record') ||
    matchingDossiers.has('new-horizons');

  const visibleProbes = FLEET_PROBES.filter((probe) => {
    if (selectedDecade === 'all') return true;
    if (selectedDecade === '1970s') return probe.launchYear >= 1970 && probe.launchYear < 1980;
    if (selectedDecade === '2000s') return probe.launchYear >= 2000 && probe.launchYear < 2010;
    if (selectedDecade === '2010s') return probe.id === 'voyager-1';
    return false;
  });

  const activeTrack = GOLDEN_RECORD_TRACKS[activeTrackIndex];
  const selectedProbe =
    visibleProbes.find((p) => p.id === selectedProbeId) ?? visibleProbes[0] ?? FLEET_PROBES[0];

  const stopSynth = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
    } catch {
      // Ignore audio teardown errors in headless environments
    }
  };

  const startSynth = (freqHz: number, mode: string) => {
    stopSynth();
    try {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = mode === 'pulsar' ? 'square' : mode === 'whale' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freqHz, ctx.currentTime);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
    } catch {
      // Audio playback gracefully degrades when Web Audio is unavailable
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => undefined);
      }
    };
  }, []);

  const toggleRecordPlayback = () => {
    if (isPlayingRecord) {
      stopSynth();
      setIsPlayingRecord(false);
    } else {
      startSynth(activeTrack.freqHz, activeTrack.mode);
      setIsPlayingRecord(true);
    }
  };

  const selectTrack = (index: number) => {
    setActiveTrackIndex(index);
    const nextTrack = GOLDEN_RECORD_TRACKS[index];
    if (isPlayingRecord) {
      startSynth(nextTrack.freqHz, nextTrack.mode);
    }
  };

  return (
    <section id="chapter-deep-space" className="py-16 sm:py-20 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Chapter Header Banner */}
        <div className="bg-[#0B111E] border border-cyan-900/40 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-400">
            Chapter 03 · Interstellar Distance · 164.5 Astronomical Units
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
            CHAPTER 03: DEEP SPACE & INTERSTELLAR WANDERERS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            The Heliopause Boundary & Galactic Void. Traveling beyond the reach of the Sun’s solar wind.
          </p>
        </div>

        {/* Dossier 05: Voyager Interstellar */}
        {showVoyagerDossier && (
        <div id="dossier-voyager" className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-20">
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <VoyagerInterstellarPlate />

            <div className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Power Source</span>
                <span className="text-amber-300 font-semibold">3 × Pu-238 RTG (Decay ~4.2 W/yr)</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">Launch Power</span>
                  <strong className="text-slate-100 text-sm tabular-nums">470 Watts</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Current Output</span>
                  <strong className="text-cyan-300 text-sm tabular-nums">~215 Watts</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Power drops ~4W annually. Non-essential instruments are methodically switched off to extend telemetry
                into the 2030s.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 relic-card bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-400">
                Relic Dossier 05 · Voyager Interstellar
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                The Cosmic Bubble Pop & The Cold Void
              </h3>

              {(readingMode === 'all' || readingMode === 'junior') && (
                <div className="mt-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-amber-400 mb-1.5">
                    Junior Explorer Story
                  </p>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                    Our Sun blows a giant invisible protective bubble around all the planets called the heliosphere. In
                    2012, after flying for 35 years, Voyager 1 popped right through the edge of that bubble! For the
                    first time in human history, an artificial machine felt the cold breeze of true interstellar space.
                  </p>
                </div>
              )}

              {(readingMode === 'all' || readingMode === 'cadet') && (
                <div className="mt-5 bg-[#070B13] border border-slate-800 rounded-lg p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.12em] text-cyan-300">
                    Cadet Flight Telemetry · The 40 Hz Plasma Jump
                  </p>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    On August 25, 2012 (at 121.6 AU from Earth), Voyager 1 recorded a sudden drop in low-energy solar
                    ions to near zero. Simultaneously, the Plasma Wave Subsystem detected a 40-fold spike in cold,
                    dense galactic plasma electron density (400 Hz oscillations). Humanity had officially crossed the
                    heliopause.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs font-mono text-slate-400">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>
                  Interstellar Speed: <strong className="text-slate-100 tabular-nums">17.0 km/sec</strong> (38,026 mph)
                </span>
                <span className="text-cyan-300">Next Star Encounter: Gliese 445 in ~40,000 years</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Explorer scale: 1 AU = Earth-to-Sun distance · 17.0 km/sec = crossing the USA in about 4 minutes
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Dossier 06: Humanity's Greeting to Starlight (Interactive Golden Record) */}
        {showGoldenRecordDossier && (
        <div id="dossier-golden-record" className="mt-10 relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-20">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-amber-400">
                Relic Dossier 06 · The Golden Record
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                Humanity’s Greeting to Starlight
              </h3>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Bolted to the exterior of both Voyager 1 and Voyager 2 is a 12-inch gold-plated copper phonograph record
              encased in an electroplated aluminum jacket. Coated in ultra-pure Uranium-238 (which has a radioactive
              half-life of 4.468 billion years), it doubles as a cosmic clock for any extraterrestrial intelligence to
              date our existence.
            </p>

            {/* 3-Column Content Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#070B13] border border-slate-800 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase text-amber-400">Audio Heritage</span>
                <div className="mt-1 text-sm font-bold text-slate-100">55 World Languages</div>
                <p className="mt-0.5 text-[11px] text-slate-400">From Akkadian to Wu Chinese</p>
              </div>
              <div className="bg-[#070B13] border border-slate-800 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase text-cyan-400">Natural Soundscape</span>
                <div className="mt-1 text-sm font-bold text-slate-100">Whale Songs & Rain</div>
                <p className="mt-0.5 text-[11px] text-slate-400">Plus human brainwaves EEG</p>
              </div>
              <div className="bg-[#070B13] border border-slate-800 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase text-emerald-400">Musical Capsule</span>
                <div className="mt-1 text-sm font-bold text-slate-100">Bach & Chuck Berry</div>
                <p className="mt-0.5 text-[11px] text-slate-400">90 minutes of Earthly music</p>
              </div>
            </div>

            <div className="bg-[#070B13] border border-slate-800 rounded-lg p-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-300">
                Interstellar Machine Telemetry
              </p>
              <p className="mt-1.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                The cover contains etched diagrams showing how to play the record with the included phonograph needle,
                along with a pulsar triangulation star map pointing back to our yellow-star Sun using 14 cosmic pulsar
                beacons.
              </p>
            </div>

            {(readingMode === 'all' || readingMode === 'junior') && (
              <div className="bg-amber-950/20 border border-amber-500/25 rounded-lg p-3.5 text-xs sm:text-[13px] text-amber-100/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Junior Explorer Tip:</span> Because aliens wouldn’t read
                English or Spanish, NASA carved picture instructions and a star map onto the gold cover—click{' '}
                <strong className="text-amber-200">Play Groove</strong> to hear the kinds of Earth signals onboard!
              </div>
            )}
          </div>

          {/* Interactive 2D Golden Record Disc & Groove Audition Player */}
          <div className="lg:col-span-6 bg-[#070B13] border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col items-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {isPlayingRecord && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1 rounded-full border-2 border-amber-400/50 animate-radio-ripple"
                />
              )}
              <svg
                viewBox="0 0 260 260"
                className={`relative z-10 w-full h-full ${isPlayingRecord ? 'animate-record-spin' : ''}`}
                role="img"
                aria-label="Interactive Voyager Golden Record etched cover diagram"
              >
                <defs>
                  <radialGradient id="goldDisc" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="45%" stopColor="#D97706" />
                    <stop offset="88%" stopColor="#92400E" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </radialGradient>
                </defs>

                {/* Outer Gold Disc */}
                <circle cx="130" cy="130" r="122" fill="url(#goldDisc)" stroke="#FDE68A" strokeWidth="2" />
                <circle cx="130" cy="130" r="108" fill="none" stroke="#451A03" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx="130" cy="130" r="94" fill="none" stroke="#451A03" strokeWidth="0.8" />
                <circle cx="130" cy="130" r="78" fill="none" stroke="#451A03" strokeWidth="0.8" />

                {/* Top-left Phonograph Diagram */}
                <circle cx="88" cy="84" r="24" fill="none" stroke="#451A03" strokeWidth="1.5" />
                <line x1="88" y1="60" x2="88" y2="108" stroke="#451A03" strokeWidth="1" />
                <line x1="64" y1="84" x2="112" y2="84" stroke="#451A03" strokeWidth="1" />

                {/* Top-right Video Scan Diagram */}
                <rect x="148" y="64" width="44" height="32" fill="none" stroke="#451A03" strokeWidth="1.5" />
                <circle cx="170" cy="80" r="10" fill="none" stroke="#451A03" strokeWidth="1.2" />

                {/* Bottom-left 14-Pulsar Map pointing to Sol */}
                <g transform="translate(88, 172)" stroke="#451A03" strokeWidth="1.4">
                  <line x1="0" y1="0" x2="-26" y2="-18" />
                  <line x1="0" y1="0" x2="22" y2="-22" />
                  <line x1="0" y1="0" x2="32" y2="4" />
                  <line x1="0" y1="0" x2="14" y2="28" />
                  <line x1="0" y1="0" x2="-18" y2="26" />
                  <line x1="0" y1="0" x2="-30" y2="6" />
                  <circle cx="0" cy="0" r="3" fill="#451A03" />
                </g>

                {/* Bottom-right Hydrogen Hyperfine Transition (1420 MHz) */}
                <circle cx="156" cy="172" r="10" fill="none" stroke="#451A03" strokeWidth="1.5" />
                <circle cx="184" cy="172" r="10" fill="none" stroke="#451A03" strokeWidth="1.5" />
                <line x1="168" y1="172" x2="172" y2="172" stroke="#451A03" strokeWidth="1.5" />

                {/* Center Spindle */}
                <circle cx="130" cy="130" r="14" fill="#070B13" stroke="#FDE68A" strokeWidth="2" />
              </svg>
            </div>

            {/* Playback & Track Selector */}
            <div className="mt-5 w-full space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300">
                    <Disc3 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{activeTrack.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{activeTrack.description}</p>
                </div>

                <button
                  type="button"
                  onClick={toggleRecordPlayback}
                  aria-pressed={isPlayingRecord}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                >
                  {isPlayingRecord ? (
                    <>
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      Pause Groove
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      Play Groove
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Golden Record Audio Samples">
                {GOLDEN_RECORD_TRACKS.map((track, idx) => {
                  const selected = idx === activeTrackIndex;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => selectTrack(idx)}
                      className={`px-3 py-2.5 rounded-md border text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                        selected
                          ? 'bg-amber-400/15 border-amber-400 text-amber-200'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="block text-[10px] font-mono uppercase">{track.category}</span>
                      <span className="block text-xs font-medium mt-0.5">{track.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>{isPlayingRecord ? `Synthesizing ${activeTrack.freqHz} Hz carrier` : 'Ready on 16⅔ RPM stylus'}</span>
                </span>
                <span>U-238 Half-life: 4.468B yrs</span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Interstellar Ghost Fleet Status Matrix */}
        {showFleetMatrix && (
        <div id="fleet-status" className="mt-14 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-400">
                Deep Space Network · Fleet Matrix
              </p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-50">
                Interstellar Ghost Fleet Status
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Select a spacecraft to inspect deep-space telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleProbes.map((probe) => {
              const isSelected = probe.id === selectedProbe.id;
              const statusColor =
                probe.statusTone === 'emerald'
                  ? 'text-emerald-300'
                  : probe.statusTone === 'amber'
                  ? 'text-amber-300'
                  : 'text-slate-400';

              const hoverTone =
                probe.statusTone === 'emerald'
                  ? 'relic-card relic-card-emerald'
                  : probe.statusTone === 'amber'
                  ? 'relic-card relic-card-amber'
                  : 'relic-card';

              return (
                <button
                  key={probe.id}
                  type="button"
                  onClick={() => setSelectedProbeId(probe.id)}
                  aria-pressed={isSelected}
                  className={`${hoverTone} text-left bg-[#0E1420] border rounded-xl p-5 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'border-cyan-400 bg-[#111A2B]'
                      : 'border-slate-800/90'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-slate-50">{probe.name}</span>
                      <Radio className={`w-4 h-4 shrink-0 ${statusColor}`} aria-hidden="true" />
                    </div>
                    <p className={`mt-1 text-[11px] font-mono uppercase tracking-wider ${statusColor}`}>
                      {probe.status}
                    </p>
                    <div className="mt-3 text-lg font-bold font-mono text-cyan-300 tabular-nums">
                      {probe.distanceLabel}
                    </div>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{probe.details}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">{probe.bearingLabel}</span>
                    <span className="text-slate-200">{probe.constellation}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Probe Telemetry Detail Strip */}
          <div className="mt-4 bg-[#0B101B] border border-slate-800/90 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Selected Relic Telemetry · {selectedProbe.name} (Launched {selectedProbe.launchYear})
              </div>
              <p className="text-sm text-slate-200">{selectedProbe.instrumentNote}</p>
            </div>
            <div className="text-xs font-mono text-amber-300 whitespace-nowrap shrink-0">
              Power: {selectedProbe.powerWatts}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};
