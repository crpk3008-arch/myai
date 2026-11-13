import React, { useState } from 'react';
import { Crosshair, ShieldCheck, Wrench } from 'lucide-react';
import { ReadingMode } from '../data/relicsData';
import { computeLaserBounce } from '../utils/physics';
import { DecadeFilter, getMatchingDossiersForDecade } from '../utils/timeline';
import { LaserRetroreflectorPlate, LunarRoverPlate } from './RelicPlates';

interface ChapterOneMoonProps {
  readingMode: ReadingMode;
  selectedDecade?: DecadeFilter;
}

export const ChapterOneMoon: React.FC<ChapterOneMoonProps> = ({
  readingMode,
  selectedDecade = 'all',
}) => {
  const [pulseCount, setPulseCount] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [lunarDistanceKm, setLunarDistanceKm] = useState(384400);

  const matchingDossiers = getMatchingDossiersForDecade(selectedDecade);
  const showLrv = matchingDossiers.has('lrv');
  const showLrrr = matchingDossiers.has('lrrr');

  const bounce = computeLaserBounce(lunarDistanceKm, pulseCount);

  const handleFireLaser = () => {
    setPulseCount((c) => c + 1);
    setPulseActive(true);
    window.setTimeout(() => {
      setPulseActive(false);
    }, 1200);
  };

  return (
    <section id="chapter-moon" className="py-16 sm:py-20 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Chapter Header Banner */}
        <div className="bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-cyan-400">
            Chapter 01 · Lunar Surface · Distance: 384,400 km
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
            CHAPTER 01: MOON RELICS — ELECTRIC BUGGIES & WORKING MIRRORS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Target: Mare Imbrium & Taurus-Littrow. Preserved in the airless, silent lunar vacuum for over 50 years.
          </p>
        </div>

        {/* Dossier 01: Origami Buggies with Piano Wire Tires */}
        {showLrv && (
        <div id="dossier-lrv" className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-20">
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <LunarRoverPlate />

            {/* 4-Cell Spec Matrix */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relic-card bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Propulsion</span>
                <div className="mt-1 text-base font-bold font-mono text-slate-100 tabular-nums">4 × 0.25 HP</div>
                <span className="text-[11px] text-slate-400">Electric hub motors</span>
              </div>
              <div className="relic-card bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Top Speed</span>
                <div className="mt-1 text-base font-bold font-mono text-cyan-300 tabular-nums">18.0 km/h</div>
                <span className="text-[11px] text-slate-400">Gene Cernan record · Bike speed</span>
              </div>
              <div className="relic-card bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Tire Material</span>
                <div className="mt-1 text-base font-bold font-mono text-slate-100">Piano Wire</div>
                <span className="text-[11px] text-slate-400">Zinc-coated steel mesh</span>
              </div>
              <div className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Mass</span>
                <div className="mt-1 text-base font-bold font-mono text-amber-300 tabular-nums">210 kg</div>
                <span className="text-[11px] text-slate-400">Unloaded Earth weight</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relic-card bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-cyan-400">
                Relic Dossier 01 · LRV Fleet
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                Origami Buggies with Piano Wire Tires!
              </h3>

              {(readingMode === 'all' || readingMode === 'junior') && (
                <div className="mt-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-amber-400 mb-1.5">
                    Junior Explorer Story
                  </p>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                    Did you know you can’t use normal car tires in space? Air-filled rubber tires would blow up like
                    giant party balloons because space has zero air pressure! So Boeing built tires out of thousands of
                    strands of 0.033-inch steel piano wire with titanium chevron treads like shoe cleats. The entire car
                    was folded up like an origami lawn chair against the outside of the lunar lander. When astronauts
                    pulled two cords, it swung down and snapped together automatically!
                  </p>
                </div>
              )}

              {(readingMode === 'all' || readingMode === 'cadet') && (
                <div className="mt-5 bg-[#070B13] border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-cyan-300">
                    <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>The Legendary Duct Tape Fender Fix</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    On Apollo 17, Gene Cernan accidentally caught his rock hammer on the rover’s fiberglass rear fender,
                    snapping it off. Instantly, the spinning wire wheel kicked blinding plumes of jagged obsidian-like
                    lunar dust all over their spacesuits and instrument consoles. Astronauts fixed the multi-million-dollar
                    rover using four laminated paper maps taped together with plain gray duct tape and held on by two
                    optical clamps. That tape-and-map fender is still sitting on the Moon today!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Protected under the U.S. One Small Step to Protect Human Heritage in Space Act (2020)</span>
            </div>
          </div>
        </div>
        )}

        {/* Dossier 02: Magic Corner Cubes That Never Die (LRRR Interactive) */}
        {showLrrr && (
        <div id="dossier-lrrr" className="mt-10 relic-card relic-card-emerald bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-20">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-amber-400">
                Relic Dossier 02 · Laser LRRR
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                Magic Corner Cubes That Never Die!
              </h3>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Unlike rovers, radios, or satellites, the Apollo Lunar Laser Ranging Retroreflectors have zero moving
              parts, zero batteries, and zero wires. Yet they are the only Apollo experiment still providing fresh
              scientific data to universities across the globe today!
            </p>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Each array consists of 100 quartz “corner-cube prisms” precision-cut so that any beam of light hitting
              them from any angle is reflected directly back parallel to where it came from—like a high-tech bicycle
              reflector.
            </p>

            {(readingMode === 'all' || readingMode === 'junior') && (
              <div className="bg-amber-950/20 border border-amber-500/25 rounded-lg p-3.5 text-xs sm:text-[13px] text-amber-100/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Junior Explorer Tip:</span> Just like shiny bike-pedal
                reflectors bounce car headlights back to the driver, these Moon mirrors bounce Earth’s green laser
                straight back in about 2.5 seconds—with zero batteries!
              </div>
            )}

            {/* Interactive Laser Pulse Simulator */}
            <div className="bg-[#070B13] border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-slate-400">
                    Apache Point Observatory (Earth) → Tranquility Base
                  </span>
                  <div className="mt-1 flex items-center gap-3 text-xs font-mono text-slate-300 tabular-nums">
                    <span>Distance: {bounce.oneWayDistanceKm.toLocaleString('en-US')} km</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-300">
                      Round Trip: {bounce.roundTripSeconds.toFixed(3)} s
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFireLaser}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  <Crosshair className="w-3.5 h-3.5" aria-hidden="true" />
                  {pulseActive ? 'Pulse In Flight…' : 'Fire Laser Pulse (532 nm)'}
                </button>
              </div>

              <div>
                <label htmlFor="lunar-orbit-range" className="sr-only">
                  Earth-Moon orbital distance (perigee to apogee)
                </label>
                <input
                  id="lunar-orbit-range"
                  type="range"
                  min={356500}
                  max={406700}
                  step={500}
                  value={lunarDistanceKm}
                  onChange={(e) => setLunarDistanceKm(Number(e.target.value))}
                  className="w-full telemetry-slider"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-mono text-slate-500 tabular-nums">
                  <span>Perigee / Closest (356,500 km)</span>
                  <span>Mean (384,400 km)</span>
                  <span>Apogee / Farthest (406,700 km)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[11px]">Pulse Output</span>
                  <strong className="text-slate-100">{bounce.photonsFiredLabel}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Photons Detected</span>
                  <strong className="text-emerald-300 tabular-nums" data-testid="laser-photon-count">
                    {pulseCount === 0 ? 'Standby' : `${bounce.photonsReturned} photons (#${pulseCount})`}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Lunar Drift</span>
                  <strong className="text-amber-300 tabular-nums">+{bounce.recessionCmPerYear} cm/yr</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <LaserRetroreflectorPlate pulseActive={pulseActive} />
          </div>
        </div>
        )}
      </div>
    </section>
  );
};
