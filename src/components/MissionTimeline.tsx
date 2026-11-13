import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import {
  DECADE_OPTIONS,
  DecadeFilter,
  TIMELINE_MILESTONES,
  TimelineMilestone,
  filterMilestonesByDecade,
} from '../utils/timeline';

interface MissionTimelineProps {
  selectedDecade: DecadeFilter;
  onSelectDecade: (decade: DecadeFilter) => void;
  onJumpToRelic: (anchorId: string) => void;
}

export const MissionTimeline: React.FC<MissionTimelineProps> = ({
  selectedDecade,
  onSelectDecade,
  onJumpToRelic,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeMilestones = filterMilestonesByDecade(selectedDecade);

  const handleScrollTrack = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const offset = direction === 'left' ? -340 : 340;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleMilestoneClick = (milestone: TimelineMilestone) => {
    if (selectedDecade !== 'all' && selectedDecade !== milestone.decade) {
      onSelectDecade(milestone.decade);
    }
    window.setTimeout(() => {
      onJumpToRelic(milestone.anchorId);
    }, 30);
  };

  return (
    <section
      id="mission-timeline"
      aria-label="Chronological Mission Timeline"
      className="py-10 sm:py-12 border-b border-slate-800/80 bg-[#070B14] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Row: Title & Decade Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-400">
              Chronological Mission Log · 1969–2018
            </p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-50">
              Horizontal Mission Timeline
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Decade Filter Buttons */}
            <div
              role="group"
              aria-label="Filter archive by decade"
              className="inline-flex flex-nowrap items-center gap-1 bg-[#0B101B] border border-slate-800 rounded-lg p-1 overflow-x-auto max-w-full"
            >
              {DECADE_OPTIONS.map((option) => {
                const isActive = selectedDecade === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onSelectDecade(option.id)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                      isActive
                        ? 'bg-cyan-400 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/70'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Track Scroll Controls */}
            <div className="hidden sm:inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleScrollTrack('left')}
                aria-label="Scroll timeline left"
                className="p-2 rounded-md bg-[#0E1420] border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTrack('right')}
                aria-label="Scroll timeline right"
                className="p-2 rounded-md bg-[#0E1420] border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Rail */}
        <div
          ref={scrollContainerRef}
          data-testid="timeline-scroll-track"
          className="mt-6 relative overflow-x-auto pb-3"
        >
          <div className="relative min-w-max pt-2 pb-1">
            {/* Continuous Chronological Axis Line */}
            <div
              aria-hidden="true"
              className="absolute left-4 right-4 top-[13px] h-px bg-slate-800"
            />

            <div className="flex items-stretch gap-4 px-1">
              {TIMELINE_MILESTONES.map((milestone) => {
                const isHighlighted =
                  selectedDecade === 'all' || selectedDecade === milestone.decade;

                const dotColor =
                  milestone.accent === 'emerald'
                    ? 'bg-emerald-400 border-emerald-200'
                    : milestone.accent === 'amber'
                    ? 'bg-amber-400 border-amber-200'
                    : 'bg-cyan-400 border-cyan-200';

                const dateColor =
                  milestone.accent === 'emerald'
                    ? 'text-emerald-300'
                    : milestone.accent === 'amber'
                    ? 'text-amber-300'
                    : 'text-cyan-300';

                const hoverClass =
                  milestone.accent === 'emerald'
                    ? 'relic-card relic-card-emerald'
                    : milestone.accent === 'amber'
                    ? 'relic-card relic-card-amber'
                    : 'relic-card';

                return (
                  <div
                    key={milestone.id}
                    className={`w-64 shrink-0 flex flex-col transition-opacity duration-150 ${
                      isHighlighted ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                    }`}
                  >
                    {/* Axis Node Marker */}
                    <div className="flex items-center gap-2 mb-3 px-2 relative z-10">
                      <span
                        aria-hidden="true"
                        className={`w-2.5 h-2.5 rounded-full border ${dotColor}`}
                      />
                      <span className={`text-[11px] font-mono font-semibold tabular-nums ${dateColor}`}>
                        {milestone.dateLabel}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-500 ml-auto">
                        {milestone.decade}
                      </span>
                    </div>

                    {/* Interactive Milestone Card */}
                    <button
                      type="button"
                      onClick={() => handleMilestoneClick(milestone)}
                      className={`${hoverClass} flex-1 text-left bg-[#0E1420] border rounded-xl p-4 flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                        selectedDecade === milestone.decade
                          ? 'border-cyan-400/70 bg-[#11192A]'
                          : 'border-slate-800/90'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-mono text-slate-400">
                          {milestone.destination}
                        </div>
                        <h3 className="mt-1 text-sm font-bold text-slate-100">
                          {milestone.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                          {milestone.summary}
                        </p>
                      </div>
                      <span className="mt-3 text-[11px] font-mono text-cyan-300">
                        Inspect relic →
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Indicator Strip */}
        {selectedDecade !== 'all' && (
          <div
            data-testid="active-decade-banner"
            className="mt-4 bg-[#0E1420] border border-cyan-500/30 rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-3"
          >
            <span className="text-xs font-mono text-slate-200">
              Filtered to <strong className="text-cyan-300">{selectedDecade}</strong>{' '}
              <span aria-hidden="true">·</span>{' '}
              {activeMilestones.length} mission {activeMilestones.length === 1 ? 'milestone' : 'milestones'} active below
            </span>
            <button
              type="button"
              onClick={() => onSelectDecade('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-400/10 border border-cyan-400/30 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              Show All Decades
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
