import React from 'react';

interface HeaderNavProps {
  scrollProgress: number;
  estimatedMinutes: number;
  onJumpTo: (id: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ scrollProgress, estimatedMinutes, onJumpTo }) => {
  const pct = Math.round(Math.max(0, Math.min(100, scrollProgress)));
  const readingLabel = `${Math.max(1, estimatedMinutes)} min read`;

  return (
    <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onJumpTo('top');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          Cosmic Relics
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Archive Chapters" className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a
            href="#prologue"
            onClick={(e) => {
              e.preventDefault();
              onJumpTo('prologue');
            }}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Prologue
          </a>
          <a
            href="#chapter-moon"
            onClick={(e) => {
              e.preventDefault();
              onJumpTo('chapter-moon');
            }}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            01 Moon
          </a>
          <a
            href="#chapter-mars"
            onClick={(e) => {
              e.preventDefault();
              onJumpTo('chapter-mars');
            }}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            02 Mars
          </a>
          <a
            href="#chapter-deep-space"
            onClick={(e) => {
              e.preventDefault();
              onJumpTo('chapter-deep-space');
            }}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            03 Deep Space
          </a>
          <a
            href="#fleet-status"
            onClick={(e) => {
              e.preventDefault();
              onJumpTo('fleet-status');
            }}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Ghost Fleet
          </a>
        </nav>

        {/* Zone 3: Reading time readout & primary action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span
            data-testid="estimated-reading-time"
            aria-label={`Estimated archive reading time: ${readingLabel}`}
            className="text-xs font-mono text-slate-400 tabular-nums whitespace-nowrap shrink-0"
          >
            {readingLabel}
          </span>
          <button
            type="button"
            onClick={() => onJumpTo('mass-calculator')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Mass Simulator
          </button>
        </div>
      </div>

      {/* Slim Archive Reading Progress Bar */}
      <div className="h-[2px] w-full bg-slate-900 relative" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Archive reading progress">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
};
