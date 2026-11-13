import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLunarMassPenalty,
  computeLaserBounce,
  formatKg,
  formatKidFriendlyFuelComparison,
} from './physics';

test('calculateLunarMassPenalty matches the 210 kg LRV reference benchmark', () => {
  const result = calculateLunarMassPenalty(210);
  assert.equal(result.discardedMassKg, 210);
  assert.equal(result.ascentFuelSavedKg, 672);
  assert.equal(result.saturnPadFuelSavedKg, 15850);
  assert.ok(result.deltaVPreservedMs > 140);
});

test('calculateLunarMassPenalty clamps negative and excessive inputs safely', () => {
  assert.equal(calculateLunarMassPenalty(-40).ascentFuelSavedKg, 0);
  assert.equal(calculateLunarMassPenalty(999).discardedMassKg, 500);
  assert.equal(calculateLunarMassPenalty(Number.NaN).discardedMassKg, 0);
});

test('computeLaserBounce calculates realistic Earth-Moon round trip light time', () => {
  const bounce = computeLaserBounce(384400, 1);
  assert.equal(bounce.oneWayDistanceKm, 384400);
  assert.equal(bounce.roundTripSeconds, 2.564);
  assert.equal(bounce.photonsReturned, 3);
  assert.equal(bounce.recessionCmPerYear, 3.78);
});

test('formatKg formats integer mass values with comma separators', () => {
  assert.equal(formatKg(15850), '15,850 kg');
  assert.equal(formatKg(672), '672 kg');
});

test('formatKidFriendlyFuelComparison scales cleanly across mass brackets', () => {
  assert.equal(formatKidFriendlyFuelComparison(0), '0 kg — slide right to see fuel saved');
  assert.equal(formatKidFriendlyFuelComparison(604), '≈ 121 heavy school backpacks of fuel');
  assert.equal(formatKidFriendlyFuelComparison(2800), '≈ 2 mid-size cars of fuel');
  assert.equal(formatKidFriendlyFuelComparison(15850), '≈ 2.6 adult African elephants of fuel');
});
