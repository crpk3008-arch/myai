export interface MassPenaltyResult {
  discardedMassKg: number;
  ascentFuelSavedKg: number;
  saturnPadFuelSavedKg: number;
  deltaVPreservedMs: number;
  equivalentAstronautsMassRatio: number;
}

export interface LaserBounceResult {
  roundTripSeconds: number;
  oneWayDistanceKm: number;
  photonsFiredLabel: string;
  photonsReturned: number;
  recessionCmPerYear: number;
}

/**
 * Computes Apollo Lunar Module ascent fuel and Saturn V launch pad propellant
 * saved by leaving payload on the lunar surface.
 *
 * Calibrated to Apollo 17 LRV benchmark:
 * - 210 kg discarded LRV -> 672 kg LM Ascent Stage fuel saved (3.2x multiplier)
 * - 210 kg discarded LRV -> 15,850 kg Saturn V pad propellant saved (~75.476x multiplier)
 */
export function calculateLunarMassPenalty(discardedMassKg: number): MassPenaltyResult {
  const clamped = Math.max(0, Math.min(500, Number.isFinite(discardedMassKg) ? discardedMassKg : 0));
  const ascentFuelSavedKg = Math.round(clamped * 3.2);
  const saturnPadFuelSavedKg = Math.round((clamped * 15850) / 210);

  // Approximate ascent delta-v penalty avoided relative to a 4,700 kg nominal LM ascent dry+prop mass
  // Using Tsiolkovsky delta-v sensitivity (~0.68 m/s per kg of extra dry mass at v_e = 3050 m/s)
  const deltaVPreservedMs = Number((clamped * 0.68).toFixed(1));
  const equivalentAstronautsMassRatio = Number((clamped / 82).toFixed(2));

  return {
    discardedMassKg: clamped,
    ascentFuelSavedKg,
    saturnPadFuelSavedKg,
    deltaVPreservedMs,
    equivalentAstronautsMassRatio,
  };
}

/**
 * Computes Lunar Laser Ranging (LRRR) bounce metrics for a given Earth-Moon distance.
 */
export function computeLaserBounce(distanceKm: number = 384400, seedIndex: number = 0): LaserBounceResult {
  const speedOfLightKmPerSec = 299792.458;
  const clampedDist = Math.max(356500, Math.min(406700, distanceKm));
  const roundTripSeconds = Number(((2 * clampedDist) / speedOfLightKmPerSec).toFixed(3));
  const photonReturns = [2, 3, 1, 4, 2, 5];
  const photonsReturned = photonReturns[Math.abs(seedIndex) % photonReturns.length];

  return {
    roundTripSeconds,
    oneWayDistanceKm: Math.round(clampedDist),
    photonsFiredLabel: '10¹⁷ photons/pulse',
    photonsReturned,
    recessionCmPerYear: 3.78,
  };
}

export function formatKg(value: number): string {
  return `${Math.round(value).toLocaleString('en-US')} kg`;
}

export function formatKidFriendlyFuelComparison(kg: number): string {
  const safeKg = Number.isFinite(kg) ? Math.max(0, Math.round(kg)) : 0;
  if (safeKg === 0) {
    return '0 kg — slide right to see fuel saved';
  }
  if (safeKg < 1000) {
    const backpacks = Math.max(1, Math.round(safeKg / 5));
    return `≈ ${backpacks.toLocaleString('en-US')} heavy school backpacks of fuel`;
  }
  if (safeKg < 6000) {
    const cars = Number((safeKg / 1400).toFixed(1));
    return `≈ ${cars} mid-size cars of fuel`;
  }
  const elephants = Number((safeKg / 6000).toFixed(1));
  return `≈ ${elephants} adult African elephants of fuel`;
}

