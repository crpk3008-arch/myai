import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, RotateCcw } from 'lucide-react';
import { COSMIC_ENVIRONMENTS, MASS_PRESETS, ReadingMode } from '../data/relicsData';
import {
  calculateLunarMassPenalty,
  formatKg,
  formatKidFriendlyFuelComparison,
} from '../utils/physics';

interface PrologueSectionProps {
  readingMode: ReadingMode;
  onReadingModeChange: (mode: ReadingMode) => void;
  discardedMassKg: number;
  onDiscardedMassChange: (mass: number) => void;
}

export const PrologueSection: React.FC<PrologueSectionProps> = ({
  readingMode,
  onReadingModeChange,
  discardedMassKg,
  onDiscardedMassChange,
}) => {
  const [expandedEnvId, setExpandedEnvId] = useState<string | null>('lunar-vacuum');
  const penalty = calculateLunarMassPenalty(discardedMassKg);

  const showJunior = readingMode === 'all' || readingMode === 'junior';
  const showCadet = readingMode === 'all' || readingMode === 'cadet';

  return (
    <section id="prologue" className="py-16 sm:py-20 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-amber-400 mb-2">
            00 · Opening Foundation
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
            PROLOGUE: WHY DID WE LEAVE THEM BEHIND?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            The cold arithmetic of gravity: how leaving prized machinery behind is the greatest act of survival in
            cosmic exploration.
          </p>
        </div>

        {/* Reading Mode Toolbar */}
        <div className="mt-8 bg-[#0E1420] border border-slate-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-slate-400">
            Reading Mode Toggle
          </div>
          <div
            role="tablist"
            aria-label="Reading Briefing Complexity"
            className="inline-flex flex-wrap items-center gap-1.5 bg-[#070B13] border border-slate-800 rounded-lg p-1"
          >
            {[
              { id: 'all' as const, label: 'Side-by-Side (All)' },
              { id: 'junior' as const, label: 'Junior Explorer (7–11)' },
              { id: 'cadet' as const, label: 'Cadet Briefing (12–17)' },
            ].map((tab) => {
              const active = readingMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onReadingModeChange(tab.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                    active
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Narrative Comparison Cards */}
        <div
          className={`mt-6 grid gap-6 items-stretch ${
            readingMode === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl'
          }`}
        >
          {showJunior && (
            <article className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.14em] text-amber-400">
                  Junior Explorer · Ages 7–11
                </p>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-50">
                  The Mount Everest Camping Rule
                </h3>
                <div className="mt-4 space-y-4 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                  <p>
                    Imagine climbing the steepest, coldest mountain in the world. To survive, you must carry heavy
                    tents, warm sleeping bags, and thick cooking stoves. But on the way down, you are exhausted. If you
                    try to carry every single pot and tent down the icy cliff, you won’t have enough energy to make it
                    home alive!
                  </p>
                  <p>
                    Apollo moonwalkers did the exact same thing. Their Moon buggies, giant photo cameras, and even their
                    bulky moon boots were intentionally parked on the dust. That way, their small ascent rocket was
                    light enough to lift off and bring the astronauts safely back to Earth!
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-amber-950/20 border border-amber-500/25 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-[13px] text-amber-100/90 leading-relaxed">
                  <span className="font-semibold text-amber-300">Did You Know?</span> Gene Cernan left his rover’s
                  television camera aimed straight at the Apollo 17 Lunar Module so Mission Control in Houston could
                  watch the liftoff live from 384,400 km away!
                </p>
              </div>
            </article>
          )}

          {showCadet && (
            <article className="relic-card bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-400">
                  Cadet Briefing · Ages 12–17
                </p>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-50">
                  Tsiolkovsky’s Rocket Equation Penalty
                </h3>

                <div className="mt-4 bg-[#070B13] border border-slate-800 rounded-lg py-3.5 px-4 text-center">
                  <code className="font-mono text-base sm:text-lg text-cyan-300 tracking-wide">
                    Δv = v<sub>e</sub> · ln(m<sub>0</sub> / m<sub>f</sub>)
                  </code>
                  <p className="mt-2 text-[11px] font-mono text-slate-400">
                    In plain words: Δv = speed boost needed · v<sub>e</sub> = exhaust speed · m<sub>0</sub>/m<sub>f</sub> = full weight vs. empty weight
                  </p>
                </div>

                <div className="mt-4 space-y-4 text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                  <p>
                    Rocket physics is ruthless. The Lunar Module Ascent Stage held only 2,353 kg of Aerozine 50 /
                    N<sub>2</sub>O<sub>4</sub> propellant inside its tanks, providing an exact Δv budget of 2,220 m/s to
                    rendezvous with the Command Module in lunar orbit.
                  </p>
                  <p>
                    Every single kilogram returned from the lunar surface demands approximately 3.2 kg of ascent stage
                    propellant, which ripples backward to require roughly 75.5 kg of Saturn V launch vehicle fuel on the
                    pad. Hauling the 210 kg Lunar Roving Vehicle back to Earth would have blown the Saturn V pad mass
                    margin by 15,850 kg.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-slate-400">
                  LRV Mass: <strong className="text-slate-100 tabular-nums">210 kg</strong>
                </span>
                <span className="text-cyan-300 tabular-nums">
                  → Saturn V Pad Fuel Penalty: 15,850 kg propellant
                </span>
              </div>
            </article>
          )}
        </div>

        {/* Interactive Lunar Liftoff Mass Penalty Calculator */}
        <div id="mass-calculator" className="mt-8 bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-7 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-400">
                Mission Math Simulator
              </p>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-50">
                The Lunar Liftoff Mass Penalty Calculator
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                Adjust discarded payload to compute rocket fuel preserved
              </span>
              <button
                type="button"
                onClick={() => onDiscardedMassChange(210)}
                aria-label="Reset calculator to 210 kg LRV mass"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-900 border border-slate-700/80 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset 210 kg
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Slider & Presets */}
            <div className="lg:col-span-5 bg-[#070B13] border border-slate-800/90 rounded-lg p-4">
              <div className="flex items-center justify-between gap-2 mb-3">
                <label
                  htmlFor="discarded-mass-slider"
                  className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400"
                >
                  Discarded Payload Mass
                </label>
                <span className="text-lg font-mono font-bold text-cyan-300 tabular-nums">
                  {formatKg(penalty.discardedMassKg)}
                </span>
              </div>

              <input
                id="discarded-mass-slider"
                type="range"
                min={0}
                max={400}
                step={1}
                value={penalty.discardedMassKg}
                onChange={(e) => onDiscardedMassChange(Number(e.target.value))}
                className="w-full telemetry-slider"
              />

              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 tabular-nums">
                <span>0 kg (Empty)</span>
                <span>210 kg (LRV)</span>
                <span>400 kg (Max)</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {MASS_PRESETS.map((preset) => {
                  const isActive = penalty.discardedMassKg === preset.massKg;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => onDiscardedMassChange(preset.massKg)}
                      className={`px-2.5 py-1.5 text-[11px] font-mono rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                        isActive
                          ? 'bg-cyan-400/15 border-cyan-400 text-cyan-300 font-semibold'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {preset.label} ({preset.massKg} kg)
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Output Telemetry Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#070B13] border border-slate-800/90 rounded-lg p-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  Ascent Stage Fuel Saved
                </span>
                <div
                  data-testid="ascent-fuel-saved"
                  className="mt-2 text-2xl font-bold font-mono text-amber-300 tabular-nums"
                >
                  {formatKg(penalty.ascentFuelSavedKg)}
                </div>
                <p className="mt-1 text-xs text-slate-400">Direct liftoff savings on Moon</p>
              </div>

              <div className="bg-[#070B13] border border-slate-800/90 rounded-lg p-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  Saturn V Pad Propellant
                </span>
                <div
                  data-testid="saturn-fuel-saved"
                  className="mt-2 text-2xl font-bold font-mono text-cyan-300 tabular-nums"
                >
                  {formatKg(penalty.saturnPadFuelSavedKg)}
                </div>
                <p className="mt-1 text-xs text-slate-400">Earth pad launch fuel avoided</p>
                <p
                  data-testid="kid-fuel-comparison"
                  className="mt-1.5 text-[11px] font-medium text-amber-300"
                >
                  {formatKidFriendlyFuelComparison(penalty.saturnPadFuelSavedKg)}
                </p>
              </div>

              <div className="bg-[#070B13] border border-slate-800/90 rounded-lg p-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  Ascent Δv Budget Saved
                </span>
                <div className="mt-2 text-2xl font-bold font-mono text-emerald-300 tabular-nums">
                  +{penalty.deltaVPreservedMs} m/s
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  ≈ {penalty.equivalentAstronautsMassRatio}× astronaut mass
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Three Cosmic Environments */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-slate-50">
              Three Cosmic Environments: How Relics Endure
            </h3>
            <span className="text-xs text-slate-400">Select an environment to inspect preservation physics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {COSMIC_ENVIRONMENTS.map((env) => {
              const isOpen = expandedEnvId === env.id;
              const accentText =
                env.accent === 'cyan'
                  ? 'text-cyan-400'
                  : env.accent === 'amber'
                  ? 'text-amber-400'
                  : 'text-sky-300';

              return (
                <div
                  key={env.id}
                  className={`relic-card ${env.accent === 'amber' ? 'relic-card-amber' : ''} bg-[#0E1420] border rounded-xl p-5 ${
                    isOpen ? 'border-slate-600' : 'border-slate-800/90'
                  }`}
                >
                  <p className={`text-[11px] font-mono uppercase tracking-[0.14em] ${accentText}`}>
                    {env.kicker}
                  </p>
                  <h4 className="mt-1.5 text-base font-bold text-slate-100">{env.title}</h4>
                  <p className="mt-2.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">{env.summary}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className={`text-xs font-mono font-semibold tabular-nums ${accentText}`}>
                      Decay Clock: {env.decayClock}
                    </span>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpandedEnvId(isOpen ? null : env.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-slate-100 px-2 py-1 rounded hover:bg-slate-800/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    >
                      {isOpen ? 'Hide Specs' : 'Specs'}
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <dl className="mt-3 pt-3 border-t border-slate-800/70 space-y-2 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Pressure</dt>
                        <dd className="font-mono text-slate-200 text-right">{env.details.pressure}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Temp Swing</dt>
                        <dd className="font-mono text-slate-200 text-right">{env.details.temperatureRange}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Primary Hazard</dt>
                        <dd className="text-slate-200 text-right">{env.details.primaryHazard}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-slate-400">Key Relic</dt>
                        <dd className="text-slate-200 text-right">{env.details.exampleRelic}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
