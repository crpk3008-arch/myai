import React from 'react';
import { MapPin, Radio } from 'lucide-react';
import { ReadingMode } from '../data/relicsData';
import { DecadeFilter, getMatchingDossiersForDecade } from '../utils/timeline';
import { OpportunityMarsPlate, VikingLanderPlate } from './RelicPlates';

interface ChapterTwoMarsProps {
  readingMode: ReadingMode;
  selectedDecade?: DecadeFilter;
}

export const ChapterTwoMars: React.FC<ChapterTwoMarsProps> = ({
  readingMode,
  selectedDecade = 'all',
}) => {
  const matchingDossiers = getMatchingDossiersForDecade(selectedDecade);
  const showOpportunity = matchingDossiers.has('opportunity');
  const showViking = matchingDossiers.has('viking');

  return (
    <section id="chapter-mars" className="py-16 sm:py-20 border-b border-slate-800/80 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Chapter Header Banner */}
        <div className="bg-[#120D0D] border border-amber-900/40 rounded-xl p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-amber-400">
            Chapter 02 · Mars Transit · Distance: 225,000,000 km
          </p>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
            CHAPTER 02: MARTIAN GRAVEYARDS & SOLAR MARTYRS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Meridiani Planum, Gusev Crater, Chryse Planitia. Dormant hulls under iron-oxide red skies.
          </p>
        </div>

        {/* Dossier 03: Little Robots That Refused to Give Up */}
        {showOpportunity && (
        <div id="dossier-opportunity" className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch scroll-mt-20">
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <OpportunityMarsPlate />

            <div className="grid grid-cols-2 gap-3">
              <div className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Designed Lifespan
                </span>
                <div className="mt-1 text-base font-bold font-mono text-slate-100 tabular-nums">90 Sols</div>
                <span className="text-[11px] text-slate-400">Expected operational span (1 Sol ≈ 24h 39m)</span>
              </div>
              <div className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Actual Survival
                </span>
                <div className="mt-1 text-base font-bold font-mono text-amber-300 tabular-nums">5,498 Sols</div>
                <span className="text-[11px] text-slate-400">Over 15 Earth years</span>
              </div>
              <div className="relic-card bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Total Traverse
                </span>
                <div className="mt-1 text-base font-bold font-mono text-cyan-300 tabular-nums">45.16 km</div>
                <span className="text-[11px] text-slate-400">Martian marathon champion (longer than a full Earth marathon!)</span>
              </div>
              <div className="relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-lg p-3.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Final Contact
                </span>
                <div className="mt-1 text-base font-bold font-mono text-slate-100 tabular-nums">Sol 5111</div>
                <span className="text-[11px] text-slate-400">June 10, 2018</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-amber-400">
                Relic Dossier 03 · MER Twins
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                Little Robots That Refused to Give Up!
              </h3>

              {(readingMode === 'all' || readingMode === 'junior') && (
                <div className="mt-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-cyan-400 mb-1.5">
                    Junior Explorer Story
                  </p>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                    Engineers at NASA hoped the solar-powered Opportunity rover would survive for three months before red
                    dust choked its solar panels. Instead, something wonderful happened: Martian whirlwinds called “dust
                    devils” swept right over the rover, blowing off the dirt like a free robotic car wash! With clean
                    panels, Opportunity kept exploring for over 14 years, discovering ancient lake beds and pebble
                    spheres called “blueberries” that proved Mars was once wet enough for liquid water.
                  </p>
                </div>
              )}

              {(readingMode === 'all' || readingMode === 'cadet') && (
                <div className="mt-5 bg-[#070B13] border border-amber-500/25 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-amber-300">
                    <Radio className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Last Recorded Telemetry Paraphrase</span>
                  </div>
                  <blockquote className="mt-2 text-base font-semibold italic text-slate-100">
                    “My battery is low and it’s getting dark.”
                  </blockquote>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    On June 10, 2018, a planet-encircling dust storm blocked 99% of sunlight over Perseverance Valley.
                    With internal battery voltage falling below survival thresholds, the vehicle entered permanent
                    hibernation. NASA declared the mission complete in February 2019.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Location: Meridiani Planum, Perseverance Valley, Mars (2.29°S, 354.47°E)</span>
            </div>
          </div>
        </div>
        )}

        {/* Dossier 04: Viking 1 & 2 */}
        {showViking && (
        <div id="dossier-viking" className="mt-10 relic-card relic-card-amber bg-[#0E1420] border border-slate-800/90 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-20">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-amber-400">
                Relic Dossier 04 · Viking Landers
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50 [text-wrap:balance]">
                Viking 1 & 2: The First Resting Monoliths
              </h3>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              In July 1976, humanity touched down on the red soil of Chryse Planitia (“Plains of Gold”). Viking 1 took
              the very first crisp color panoramas of Mars, showing a salmon-pink sky and iron-red boulders scattered
              across an alien desert.
            </p>

            <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
              Equipped with robotic soil trenchers and miniature onboard chemical laboratories, Viking 1 operated
              silently for 2,307 Earth-days before an accidental command update from Earth lost contact in November 1982.
            </p>

            <div className="bg-[#070B13] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.12em]">
                <span className="text-amber-400">Official Relic Designation</span>
                <span className="text-slate-400">NASA Honor</span>
              </div>
              <h4 className="mt-1.5 text-base font-bold text-slate-100">
                Thomas A. Mutch Memorial Station
              </h4>
              <p className="mt-1.5 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                In 1981, NASA officially renamed the Viking 1 lander after the leader of the lander imaging team. Under
                Article VIII of the 1967 Outer Space Treaty, the monolith remains permanently under sovereign US
                jurisdiction, surrounded by a 2.0 km keep-out buffer zone to prevent rocket exhaust contamination during
                future human landings.
              </p>
            </div>

            {(readingMode === 'all' || readingMode === 'junior') && (
              <div className="bg-amber-950/20 border border-amber-500/25 rounded-lg p-3.5 text-xs sm:text-[13px] text-amber-100/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Junior Explorer Tip:</span> Think of Viking 1 as a
                protected museum in the Martian sand! Future astronauts have to land at least 2 km away so rocket dust
                never covers this historic robot.
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <VikingLanderPlate />
          </div>
        </div>
        )}
      </div>
    </section>
  );
};
