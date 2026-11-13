import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, VolumeX, X } from 'lucide-react';
import {
  AMBIENT_SOUNDSCAPES,
  SoundscapeId,
  SpaceSoundscapeEngine,
  clampVolume,
  formatVolumePercent,
  getSoundscapeById,
} from '../utils/soundscapes';

export const AmbientSoundPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<SoundscapeId>('lunar-vacuum');
  const [volume, setVolume] = useState<number>(0.35);

  const engineRef = useRef<SpaceSoundscapeEngine | null>(null);
  const activeSoundscape = getSoundscapeById(activeId);

  useEffect(() => {
    engineRef.current = new SpaceSoundscapeEngine();
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const handleTogglePlayback = () => {
    const engine = engineRef.current;
    if (isPlaying) {
      engine?.stop();
      setIsPlaying(false);
    } else {
      engine?.start(activeSoundscape, volume);
      setIsPlaying(true);
    }
  };

  const handleSelectSoundscape = (id: SoundscapeId) => {
    const nextSoundscape = getSoundscapeById(id);
    setActiveId(id);
    engineRef.current?.start(nextSoundscape, volume);
    setIsPlaying(true);
  };

  const handleVolumeChange = (nextRaw: number) => {
    const clamped = clampVolume(nextRaw);
    setVolume(clamped);
    if (isPlaying) {
      engineRef.current?.setVolume(clamped);
    }
  };

  const accentBadgeText =
    activeSoundscape.accent === 'amber'
      ? 'text-amber-300'
      : activeSoundscape.accent === 'emerald'
      ? 'text-emerald-300'
      : 'text-cyan-300';

  return (
    <aside
      aria-label="Ambient space soundscape controls"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-2rem)]"
    >
      {/* Expanded Soundscape Selector Panel */}
      {isExpanded && (
        <div
          id="ambient-soundscape-drawer"
          data-testid="ambient-sound-panel"
          className="w-[calc(100vw-2rem)] sm:w-80 bg-[#0B101B]/95 backdrop-blur-md border border-slate-800 rounded-xl p-4 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm font-bold text-slate-50">Ambient Soundscapes</h2>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                Synthesized space acoustics
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Close soundscape panel"
              className="p-2 -mr-1 -mt-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Preset List */}
          <div
            role="group"
            aria-label="Space soundscape presets"
            className="mt-3 space-y-2"
          >
            {AMBIENT_SOUNDSCAPES.map((item) => {
              const isSelected = item.id === activeId;
              const realmColor =
                item.accent === 'amber'
                  ? 'text-amber-300'
                  : item.accent === 'emerald'
                  ? 'text-emerald-300'
                  : 'text-cyan-300';

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectSoundscape(item.id)}
                  className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? 'bg-[#11192A] border-cyan-400/60'
                      : 'bg-[#070B13] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-100 whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className={`text-[11px] font-mono whitespace-nowrap ${realmColor}`}>
                      {item.realm}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Volume & Play Controls */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="ambient-volume-slider" className="font-mono text-slate-300">
                  Volume
                </label>
                <span
                  data-testid="ambient-volume-readout"
                  className="font-mono text-cyan-300 tabular-nums"
                >
                  {formatVolumePercent(volume)}
                </span>
              </div>
              <input
                id="ambient-volume-slider"
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(volume * 100)}
                onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
                className="telemetry-slider w-full h-2"
              />
            </div>

            <button
              type="button"
              onClick={handleTogglePlayback}
              aria-pressed={isPlaying}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                isPlaying
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  Mute Ambient Audio
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  Play {activeSoundscape.name}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Compact Floating Corner Dock */}
      <div
        data-testid="ambient-sound-dock"
        className="inline-flex items-center bg-[#0B101B]/95 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl overflow-hidden"
      >
        <button
          type="button"
          onClick={handleTogglePlayback}
          aria-pressed={isPlaying}
          aria-label={
            isPlaying
              ? `Mute ${activeSoundscape.name} ambient audio`
              : `Play ${activeSoundscape.name} ambient audio`
          }
          className="inline-flex items-center gap-2 px-3.5 h-11 text-xs font-medium text-slate-100 hover:bg-slate-800/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-400"
        >
          {isPlaying ? (
            <span className="inline-flex items-end gap-0.5 h-3.5 shrink-0" aria-hidden="true">
              <span className="animate-eq-bar w-0.5 h-3.5 bg-cyan-300 rounded-full" />
              <span className="animate-eq-bar w-0.5 h-3.5 bg-amber-300 rounded-full" style={{ animationDelay: '0.25s' }} />
              <span className="animate-eq-bar w-0.5 h-3.5 bg-emerald-300 rounded-full" style={{ animationDelay: '0.5s' }} />
            </span>
          ) : (
            <VolumeX className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
          )}
          <span className="truncate max-w-[150px] sm:max-w-[190px]">
            {isPlaying ? activeSoundscape.name : 'Ambient Audio'}
          </span>
          <span className={`text-[11px] font-mono ${isPlaying ? accentBadgeText : 'text-slate-400'}`}>
            {isPlaying ? 'On' : 'Off'}
          </span>
        </button>

        <div className="w-px h-6 bg-slate-800 shrink-0" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="ambient-soundscape-drawer"
          aria-label={isExpanded ? 'Collapse soundscape selector' : 'Expand soundscape selector'}
          className="inline-flex items-center justify-center w-11 h-11 text-slate-300 hover:text-slate-100 hover:bg-slate-800/70 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-400"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
};
