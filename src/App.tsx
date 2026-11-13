import { useEffect, useRef, useState } from 'react';
import { AmbientSoundPanel } from './components/AmbientSoundPanel';
import { AstronautChatPanel } from './components/AstronautChatPanel';
import { ChapterOneMoon } from './components/ChapterOneMoon';
import { ChapterThreeDeepSpace } from './components/ChapterThreeDeepSpace';
import { ChapterTwoMars } from './components/ChapterTwoMars';
import { ClosingSection } from './components/ClosingSection';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { MissionTimeline } from './components/MissionTimeline';
import { PrologueSection } from './components/PrologueSection';
import { SpaceBackdrop } from './components/SpaceBackdrop';
import { ReadingMode } from './data/relicsData';
import { estimateReadingTimeMinutes } from './utils/readingTime';
import { DecadeFilter, getVisibleChaptersForDecade } from './utils/timeline';

export default function App() {
  const [readingMode, setReadingMode] = useState<ReadingMode>('all');
  const [selectedDecade, setSelectedDecade] = useState<DecadeFilter>('all');
  const [discardedMassKg, setDiscardedMassKg] = useState<number>(210);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(12);
  const mainRef = useRef<HTMLElement | null>(null);

  const visibleChapters = getVisibleChaptersForDecade(selectedDecade);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [selectedDecade, readingMode]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const text = el.innerText || el.textContent || '';
    const mins = estimateReadingTimeMinutes(text, 180);
    if (mins > 0) {
      setEstimatedMinutes(mins);
    }
  }, [readingMode, selectedDecade]);

  const handleJumpTo = (id: string) => {
    // Ensure target chapter is visible when jumping from top navigation
    if (
      selectedDecade !== 'all' &&
      (id === 'prologue' ||
        id === 'mass-calculator' ||
        id === 'chapter-moon' ||
        id === 'chapter-mars' ||
        id === 'chapter-deep-space' ||
        id === 'fleet-status')
    ) {
      setSelectedDecade('all');
      window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 40);
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060911] text-slate-100">
      <SpaceBackdrop />
      <div className="relative z-10">
        <HeaderNav
          scrollProgress={scrollProgress}
          estimatedMinutes={estimatedMinutes}
          onJumpTo={handleJumpTo}
        />
        <main ref={mainRef}>
        <HeroSection
          readingMode={readingMode}
          onReadingModeChange={setReadingMode}
        />
        <MissionTimeline
          selectedDecade={selectedDecade}
          onSelectDecade={setSelectedDecade}
          onJumpToRelic={handleJumpTo}
        />
        {visibleChapters.showPrologue && (
          <PrologueSection
            readingMode={readingMode}
            onReadingModeChange={setReadingMode}
            discardedMassKg={discardedMassKg}
            onDiscardedMassChange={setDiscardedMassKg}
          />
        )}
        {visibleChapters.showMoon && (
          <ChapterOneMoon readingMode={readingMode} selectedDecade={selectedDecade} />
        )}
        {visibleChapters.showMars && (
          <ChapterTwoMars readingMode={readingMode} selectedDecade={selectedDecade} />
        )}
        {visibleChapters.showDeepSpace && (
          <ChapterThreeDeepSpace readingMode={readingMode} selectedDecade={selectedDecade} />
        )}
          <ClosingSection
            discardedMassKg={discardedMassKg}
            onJumpToTop={() => handleJumpTo('top')}
          />
        </main>
      </div>
      <AstronautChatPanel readingMode={readingMode} />
      <AmbientSoundPanel />
    </div>
  );
}
