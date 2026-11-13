export type ReadingMode = 'all' | 'junior' | 'cadet';

export interface HeroKpi {
  label: string;
  value: string;
  sublabel: string;
  accent: 'cyan' | 'amber' | 'emerald' | 'slate';
}

export interface EnvironmentCard {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  decayClock: string;
  accent: 'cyan' | 'amber' | 'indigo';
  details: {
    pressure: string;
    temperatureRange: string;
    primaryHazard: string;
    exampleRelic: string;
  };
}

export interface FleetProbe {
  id: string;
  name: string;
  status: string;
  statusTone: 'emerald' | 'slate' | 'amber';
  distanceLabel: string;
  details: string;
  bearingLabel: string;
  constellation: string;
  launchYear: number;
  powerWatts: string;
  instrumentNote: string;
}

export interface GoldenRecordTrack {
  id: string;
  title: string;
  category: string;
  durationSec: number;
  description: string;
  freqHz: number;
  mode: 'greeting' | 'pulsar' | 'whale' | 'bach';
}

export const HERO_KPIS: HeroKpi[] = [
  {
    label: 'Total Abandoned Mass',
    value: '225,000 kg',
    sublabel: 'Across Moon, Mars & Pluto',
    accent: 'slate',
  },
  {
    label: 'Farthest Relic',
    value: '24.6B km',
    sublabel: 'Voyager 1 · Heliopause',
    accent: 'cyan',
  },
  {
    label: 'Oldest Active Laser',
    value: '54 Years',
    sublabel: 'Apollo 11 Retroreflector',
    accent: 'amber',
  },
  {
    label: 'Preservation Status',
    value: '100% Intact',
    sublabel: 'Zero-oxidation void',
    accent: 'emerald',
  },
];

export const MASS_PRESETS = [
  { label: 'Moon Boots', massKg: 8 },
  { label: 'Hasselblad Rig', massKg: 18 },
  { label: 'LRV Buggy', massKg: 210 },
  { label: 'Full Surface Kit', massKg: 350 },
];

export const COSMIC_ENVIRONMENTS: EnvironmentCard[] = [
  {
    id: 'lunar-vacuum',
    kicker: 'The Void of Lunar Vacuum',
    title: 'Airless Surface Preservation',
    summary:
      'Zero liquid water, zero wind, zero atmospheric oxygen. Metals never rust. The only natural weathering is subtle micrometeorite sandblasting and blistering UV ±130°C thermal swings.',
    decayClock: '~10,000,000 Years',
    accent: 'cyan',
    details: {
      pressure: '3 × 10⁻¹⁵ atm (Near Vacuum)',
      temperatureRange: '-173°C Night to +127°C Noon',
      primaryHazard: 'Thermal expansion cycling & UV bleaching',
      exampleRelic: 'Apollo 17 LRV-003 & Tranquility Bootprints',
    },
  },
  {
    id: 'martian-dust',
    kicker: 'Iron-Oxide Dust Storms',
    title: 'Martian Thin-Air Attrition',
    summary:
      'Thin CO₂ atmosphere (1% of Earth) creates massive planet-wide dust storms. Fine iron-oxide grains coat solar panels and act like slow sandpaper, but cold arid air preserves core titanium frames.',
    decayClock: '~100,000 Years',
    accent: 'amber',
    details: {
      pressure: '0.006 atm (95% CO₂)',
      temperatureRange: '-125°C Polar Winter to +20°C Equator',
      primaryHazard: 'Electrostatic dust deposition & wind abrasion',
      exampleRelic: 'MER-B Opportunity & Viking 1 Lander',
    },
  },
  {
    id: 'galactic-void',
    kicker: 'The Galactic Void',
    title: 'Deep Interstellar Cryostasis',
    summary:
      'Near absolute zero (2.7 Kelvin) and near-zero atom density. Cosmic radiation slowly ionizes plastics and circuits, but metal hulls and gold records will cruise past stars virtually intact forever.',
    decayClock: '~1,000,000,000 Years',
    accent: 'indigo',
    details: {
      pressure: '< 1 hydrogen atom / cm³',
      temperatureRange: '2.73 K (-270.4°C Cosmic Background)',
      primaryHazard: 'Galactic cosmic rays & interstellar micrometeors',
      exampleRelic: 'Voyager 1 & 2 Golden Records',
    },
  },
];

export const FLEET_PROBES: FleetProbe[] = [
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    status: 'Active Transmitting',
    statusTone: 'emerald',
    distanceLabel: '24.6 Billion km',
    details: '164.5 AU · One-way radio light travel time: 22h 38m',
    bearingLabel: 'Bearing',
    constellation: 'Ophiuchus',
    launchYear: 1977,
    powerWatts: '~215 W remaining (Pu-238 RTG)',
    instrumentNote: '4 science instruments active; crossing interstellar plasma.',
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    status: 'Active Transmitting',
    statusTone: 'emerald',
    distanceLabel: '20.5 Billion km',
    details: '137.1 AU · One-way radio light travel time: 18h 58m',
    bearingLabel: 'Bearing',
    constellation: 'Pavo',
    launchYear: 1977,
    powerWatts: '~220 W remaining (Pu-238 RTG)',
    instrumentNote: 'Only spacecraft ever to fly past Uranus and Neptune.',
  },
  {
    id: 'pioneer-10-11',
    name: 'Pioneer 10 & 11',
    status: 'Silent Ghost Drifters',
    statusTone: 'slate',
    distanceLabel: '~19.8 Billion km',
    details: 'Last ping received 2003 · Carrying gold aluminum plaques toward Aldebaran',
    bearingLabel: 'Heading',
    constellation: 'Taurus & Scutum',
    launchYear: 1972,
    powerWatts: '0 W (RTGs depleted)',
    instrumentNote: 'First craft through the Asteroid Belt; silent monuments forever.',
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    status: 'Kuiper Belt Survey',
    statusTone: 'amber',
    distanceLabel: '8.7 Billion km',
    details: '58.3 AU · Carries Clyde Tombaugh ashes beyond Pluto',
    bearingLabel: 'Heading',
    constellation: 'Sagittarius',
    launchYear: 2006,
    powerWatts: '~190 W remaining',
    instrumentNote: 'Measuring Kuiper Belt dust density and distant parallax.',
  },
];

export const GOLDEN_RECORD_TRACKS: GoldenRecordTrack[] = [
  {
    id: 'hello-earth',
    title: 'UN Greeting · 55 Languages',
    category: 'Audio Heritage',
    durationSec: 12,
    description: 'Synthesized carrier chime inspired by the 1977 Voyager greeting cadence.',
    freqHz: 440,
    mode: 'greeting',
  },
  {
    id: 'pulsar-beacon',
    title: '14-Pulsar Radial Beacon',
    category: 'Machine Telemetry',
    durationSec: 10,
    description: 'Rhythmic millisecond pulsar timing ticks encoding Earth’s galactic address.',
    freqHz: 660,
    mode: 'pulsar',
  },
  {
    id: 'humpback-song',
    title: 'Ocean Whale Harmonics',
    category: 'Natural Soundscape',
    durationSec: 14,
    description: 'Deep ocean frequency sweep honoring Earth’s cetacean acoustic heritage.',
    freqHz: 220,
    mode: 'whale',
  },
  {
    id: 'brandenburg-motif',
    title: 'Brandenburg Pulse Motif',
    category: 'Musical Time Capsule',
    durationSec: 16,
    description: 'Harmonic baroque interval sequence echoing Bach’s Brandenburg Concerto No. 2.',
    freqHz: 523.25,
    mode: 'bach',
  },
];
