import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AMBIENT_SOUNDSCAPES,
  clampVolume,
  formatVolumePercent,
  getNextSoundscapeId,
  getSoundscapeById,
} from './soundscapes';

test('AMBIENT_SOUNDSCAPES defines three distinct cosmic realms', () => {
  assert.equal(AMBIENT_SOUNDSCAPES.length, 3);
  const ids = new Set(AMBIENT_SOUNDSCAPES.map((s) => s.id));
  assert.equal(ids.size, 3);
  assert.ok(ids.has('lunar-vacuum'));
  assert.ok(ids.has('martian-wind'));
  assert.ok(ids.has('deep-cosmos'));
});

test('clampVolume bounds values cleanly between 0 and 1', () => {
  assert.equal(clampVolume(-0.5), 0);
  assert.equal(clampVolume(1.75), 1);
  assert.equal(clampVolume(0.426), 0.43);
  assert.equal(clampVolume(Number.NaN), 0.35);
});

test('formatVolumePercent formats bounded percentage labels', () => {
  assert.equal(formatVolumePercent(0.35), '35%');
  assert.equal(formatVolumePercent(0), '0%');
  assert.equal(formatVolumePercent(1.2), '100%');
});

test('getSoundscapeById and getNextSoundscapeId resolve presets deterministically', () => {
  assert.equal(getSoundscapeById('martian-wind').realm, 'Mars');
  assert.equal(getNextSoundscapeId('lunar-vacuum'), 'martian-wind');
  assert.equal(getNextSoundscapeId('martian-wind'), 'deep-cosmos');
  assert.equal(getNextSoundscapeId('deep-cosmos'), 'lunar-vacuum');
});
