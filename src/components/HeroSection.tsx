import React from 'react';
import { HERO_KPIS, ReadingMode } from '../data/relicsData';

const STAR_COORDINATES = [
  { x: '5%', y: '14%', r: 1.5, o: 0.4 },
  { x: '11%', y: '44%', r: 1, o: 0.28 },
  { x: '14%', y: '78%', r: 1.2, o: 0.25 },
  { x: '86%', y: '20%', r: 1.5, o: 0.4 },
  { x: '92%', y: '48%', r: 1.2, o: 0.3 },
  { x: '88%', y: '76%', r: 1.4, o: 0.35 },
];

interface HeroSectionProps {
  readingMode: ReadingMode;
  onReadingModeChange: (mode: ReadingMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ readingMode, onReadingModeChange }) => {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-800/80 pt-14 pb-16 sm:pt-20 sm:pb-20 scroll-mt-20">
      {/* Subtle deep-space starfield & faint horizon gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(14,116,144,0.18),transparent_70%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
        {STAR_COORDINATES.map((star, idx) => (
          <span
            key={idx}
            className="animate-star-twinkle absolute rounded-full bg-slate-200"
            style={{
              left: star.x,
              top: star.y,
              width: `${star.r * 2}px`,
              height: `${star.r * 2}px`,
              opacity: star.o,
              animationDelay: `${idx * 0.7}s`,
            }}
          />
        ))}
        {/* Floating little ringed planet on left margin & crescent Moon on right margin for young explorers */}
        <svg
          viewBox="0 0 64 44"
          className="animate-space-float hidden lg:block absolute left-[5%] top-[24%] w-14 h-10 opacity-45"
          fill="none"
        >
          <circle cx="32" cy="22" r="11" fill="#F59E0B" fillOpacity="0.35" stroke="#FCD34D" strokeWidth="1.2" />
          <ellipse cx="32" cy="22" rx="24" ry="6" transform="rotate(-16 32 22)" stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.8" />
        </svg>
        <svg
          viewBox="0 0 44 44"
          className="animate-space-float hidden lg:block absolute right-[6%] top-[22%] w-10 h-10 opacity-45"
          style={{ animationDelay: '-2.5s' }}
          fill="none"
        >
          <circle cx="22" cy="22" r="12" fill="#38BDF8" fillOpacity="0.25" stroke="#7DD3FC" strokeWidth="1.2" />
          <circle cx="27" cy="18" r="2.2" fill="#BAE6FD" fillOpacity="0.5" />
          <circle cx="17" cy="25" r="1.5" fill="#BAE6FD" fillOpacity="0.4" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-mono tracking-[0.18em] uppercase text-amber-400/90 mb-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
          <span>NASA Mission Archive</span>
          <span aria-hidden="true">·</span>
          <span>Moon, Mars & Interstellar Void</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-300">Young Explorer Edition (Ages 7–17)</span>
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight leading-[1.04] text-slate-50 max-w-4xl mx-auto [text-wrap:balance]">
          ABANDONED BUT{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
            NOT FORGOTTEN
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg font-medium text-cyan-300/90 tracking-wide">
          NASA’s Cosmic Relics in the Silent Void
        </p>

        <p className="mt-5 text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
          Over 680,000 pounds of human technology now rest on the Moon, Mars, and in the interstellar dark. Discover
          why abandoning billion-dollar spacecraft was not careless abandonment—it was the only mathematical reality
          that allowed humanity to touch the stars and safely return.
        </p>

        {/* 4-Column KPI Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {HERO_KPIS.map((kpi) => {
            const valueColor =
              kpi.accent === 'cyan'
                ? 'text-cyan-300'
                : kpi.accent === 'amber'
                ? 'text-amber-300'
                : kpi.accent === 'emerald'
                ? 'text-emerald-300'
                : 'text-slate-100';

            const hoverClass =
              kpi.accent === 'amber'
                ? 'relic-card relic-card-amber'
                : kpi.accent === 'emerald'
                ? 'relic-card relic-card-emerald'
                : 'relic-card';

            return (
              <div
                key={kpi.label}
                className={`${hoverClass} bg-[#0E1420]/90 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between`}
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-400">
                  {kpi.label}
                </span>
                <div className={`mt-2 text-2xl sm:text-[1.75rem] font-bold font-mono tabular-nums ${valueColor}`}>
                  {kpi.value}
                </div>
                <span className="mt-1.5 text-xs text-slate-400">{kpi.sublabel}</span>
              </div>
            );
          })}
        </div>

        {/* Young Audience Age-Group Switcher (Always Accessible) */}
        <div className="mt-8 bg-[#0B101B]/90 border border-slate-800/90 rounded-xl p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-300">
              Choose Your Explorer Level · Ages 7–17
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Switch between easy everyday stories (7–11), rocket-science briefings (12–17), or read both side by side.
            </p>
          </div>
          <div
            role="group"
            aria-label="Choose explorer reading age level"
            className="inline-flex flex-nowrap items-center gap-1 bg-[#070B13] border border-slate-800 rounded-lg p-1 overflow-x-auto max-w-full shrink-0"
          >
            {[
              { id: 'all' as const, label: 'All Ages (7–17)' },
              { id: 'junior' as const, label: 'Ages 7–11' },
              { id: 'cadet' as const, label: 'Ages 12–17' },
            ].map((item) => {
              const active = readingMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onReadingModeChange(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                    active
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
