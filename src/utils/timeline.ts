export type DecadeFilter = 'all' | '1960s' | '1970s' | '2000s' | '2010s';

export type RelicDossierId =
  | 'lrrr'
  | 'lrv'
  | 'pioneer'
  | 'viking'
  | 'voyager'
  | 'golden-record'
  | 'opportunity'
  | 'new-horizons';

export interface TimelineMilestone {
  id: string;
  dateLabel: string;
  year: number;
  decade: Exclude<DecadeFilter, 'all'>;
  title: string;
  destination: 'Moon' | 'Mars' | 'Deep Space';
  summary: string;
  dossierId: RelicDossierId;
  anchorId: string;
  accent: 'cyan' | 'amber' | 'emerald';
}

export const DECADE_OPTIONS: { id: DecadeFilter; label: string; span: string }[] = [
  { id: 'all', label: 'All Decades', span: '1969–2018' },
  { id: '1960s', label: '1960s', span: '1969' },
  { id: '1970s', label: '1970s', span: '1972–1977' },
  { id: '2000s', label: '2000s', span: '2004–2006' },
  { id: '2010s', label: '2010s', span: '2012–2018' },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'apollo-11-lrrr',
    dateLabel: '1969 · Jul 20',
    year: 1969,
    decade: '1960s',
    title: 'Apollo 11 LRRR Array',
    destination: 'Moon',
    summary: '100 quartz corner-cube prisms deployed on Tranquility Base.',
    dossierId: 'lrrr',
    anchorId: 'dossier-lrrr',
    accent: 'emerald',
  },
  {
    id: 'pioneer-10',
    dateLabel: '1972 · Mar 02',
    year: 1972,
    decade: '1970s',
    title: 'Pioneer 10 Launch',
    destination: 'Deep Space',
    summary: 'Carrying gold-anodized aluminum plaque toward Aldebaran.',
    dossierId: 'pioneer',
    anchorId: 'fleet-status',
    accent: 'cyan',
  },
  {
    id: 'apollo-17-lrv',
    dateLabel: '1972 · Dec 11',
    year: 1972,
    decade: '1970s',
    title: 'Apollo 17 LRV-003',
    destination: 'Moon',
    summary: 'Electric buggy with piano-wire tires parked at Taurus-Littrow.',
    dossierId: 'lrv',
    anchorId: 'dossier-lrv',
    accent: 'cyan',
  },
  {
    id: 'viking-1',
    dateLabel: '1976 · Jul 20',
    year: 1976,
    decade: '1970s',
    title: 'Viking 1 Lander',
    destination: 'Mars',
    summary: 'Thomas A. Mutch Memorial Station lands on Chryse Planitia.',
    dossierId: 'viking',
    anchorId: 'dossier-viking',
    accent: 'amber',
  },
  {
    id: 'voyager-golden-record',
    dateLabel: '1977 · Sep 05',
    year: 1977,
    decade: '1970s',
    title: 'Voyager 1 & Golden Record',
    destination: 'Deep Space',
    summary: 'Launched with 12-inch U-238 dated phonograph time capsule.',
    dossierId: 'golden-record',
    anchorId: 'dossier-golden-record',
    accent: 'amber',
  },
  {
    id: 'mer-b-opportunity',
    dateLabel: '2004 · Jan 25',
    year: 2004,
    decade: '2000s',
    title: 'MER-B Opportunity Lands',
    destination: 'Mars',
    summary: '90-sol rover begins 15-year trek across Meridiani Planum.',
    dossierId: 'opportunity',
    anchorId: 'dossier-opportunity',
    accent: 'amber',
  },
  {
    id: 'new-horizons',
    dateLabel: '2006 · Jan 19',
    year: 2006,
    decade: '2000s',
    title: 'New Horizons Launch',
    destination: 'Deep Space',
    summary: 'Fastest departure toward Pluto and the Kuiper Belt.',
    dossierId: 'new-horizons',
    anchorId: 'fleet-status',
    accent: 'cyan',
  },
  {
    id: 'voyager-heliopause',
    dateLabel: '2012 · Aug 25',
    year: 2012,
    decade: '2010s',
    title: 'Voyager 1 Heliopause',
    destination: 'Deep Space',
    summary: 'Crossed into interstellar space at 121.6 AU (40 Hz plasma jump).',
    dossierId: 'voyager',
    anchorId: 'dossier-voyager',
    accent: 'cyan',
  },
  {
    id: 'opportunity-sol-5111',
    dateLabel: '2018 · Jun 10',
    year: 2018,
    decade: '2010s',
    title: 'Opportunity Sol 5111',
    destination: 'Mars',
    summary: 'Final hibernation signal from Perseverance Valley dust storm.',
    dossierId: 'opportunity',
    anchorId: 'dossier-opportunity',
    accent: 'amber',
  },
];

export function filterMilestonesByDecade(
  decade: DecadeFilter,
  milestones: TimelineMilestone[] = TIMELINE_MILESTONES
): TimelineMilestone[] {
  if (decade === 'all') return milestones;
  return milestones.filter((m) => m.decade === decade);
}

export function getMatchingDossiersForDecade(decade: DecadeFilter): Set<RelicDossierId> {
  if (decade === 'all') {
    return new Set([
      'lrrr',
      'lrv',
      'pioneer',
      'viking',
      'voyager',
      'golden-record',
      'opportunity',
      'new-horizons',
    ]);
  }
  const matching = filterMilestonesByDecade(decade).map((m) => m.dossierId);
  return new Set(matching);
}

export function getVisibleChaptersForDecade(decade: DecadeFilter): {
  showPrologue: boolean;
  showMoon: boolean;
  showMars: boolean;
  showDeepSpace: boolean;
} {
  if (decade === 'all') {
    return {
      showPrologue: true,
      showMoon: true,
      showMars: true,
      showDeepSpace: true,
    };
  }
  const dossiers = getMatchingDossiersForDecade(decade);
  return {
    showPrologue: false,
    showMoon: dossiers.has('lrv') || dossiers.has('lrrr'),
    showMars: dossiers.has('opportunity') || dossiers.has('viking'),
    showDeepSpace:
      dossiers.has('voyager') ||
      dossiers.has('golden-record') ||
      dossiers.has('pioneer') ||
      dossiers.has('new-horizons'),
  };
}
