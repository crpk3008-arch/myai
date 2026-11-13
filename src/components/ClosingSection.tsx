import React, { useState } from 'react';
import { ArrowUp, Compass, Download } from 'lucide-react';
import { calculateLunarMassPenalty } from '../utils/physics';

interface ClosingSectionProps {
  discardedMassKg: number;
  onJumpToTop: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ discardedMassKg, onJumpToTop }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportDossier = () => {
    const penalty = calculateLunarMassPenalty(discardedMassKg);
    const content = [
      '# COSMIC RELICS — ARCHIVE MISSION SUMMARY',
      '',
      '## Lunar Liftoff Mass Penalty Simulation',
      `- Discarded Surface Payload: ${penalty.discardedMassKg} kg`,
      `- LM Ascent Stage Fuel Saved: ${penalty.ascentFuelSavedKg} kg`,
      `- Saturn V Pad Propellant Saved: ${penalty.saturnPadFuelSavedKg.toLocaleString('en-US')} kg`,
      `- Ascent Delta-v Margin Saved: +${penalty.deltaVPreservedMs} m/s`,
      '',
      '## Featured Active & Dormant Relics',
      '- Apollo 17 LRV-003 (Taurus-Littrow Valley, Moon)',
      '- Apollo 11/14/15 LRRR Retroreflectors (Active laser bouncing at +3.78 cm/yr)',
      '- MER-B Opportunity (Perseverance Valley, Mars — 5,498 Sols, 45.16 km)',
      '- Viking 1 / Thomas A. Mutch Memorial Station (Chryse Planitia, Mars)',
      '- Voyager 1 & 2 Golden Records (Interstellar Medium — 164.5 AU / 137.1 AU)',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cosmic-relics-dossier.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-space-float mx-auto w-11 h-11 rounded-full border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center mb-5">
            <Compass className="w-5 h-5 text-cyan-300" aria-hidden="true" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
            The Future Space Archaeologists
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Thousands of years from now, when human cities thrive under glass domes on the Moon and terraformed Martian
            plains, schoolclasses will take field trips to Tranquility Base, Endurance Crater, and the Taurus-Littrow
            Valley. They won’t see abandoned junk. They will look into the quiet dust and see the brave, solitary
            footprints of a species that dared to step beyond its home cradle.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onJumpToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              Return to Archive Overview
            </button>

            <button
              type="button"
              onClick={handleExportDossier}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-[#0E1420] hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              {downloaded ? 'Dossier Exported (.md)' : 'Export Mission Dossier'}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/80 pt-6 pb-20 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Abandoned but Not Forgotten · NASA Cosmic Relics Archive</span>
          <span className="font-mono">Lunar · Martian · Interstellar Heritage</span>
        </div>
      </footer>
    </>
  );
};
