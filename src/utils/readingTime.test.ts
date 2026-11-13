import test from 'node:test';
import assert from 'node:assert/strict';
import { countWords, estimateReadingTimeMinutes, formatReadingTime } from './readingTime';

test('countWords handles empty, whitespace, and multi-line strings', () => {
  assert.equal(countWords(''), 0);
  assert.equal(countWords('   \n\t  '), 0);
  assert.equal(countWords('Apollo 17 LRV-003 rested in Taurus-Littrow.'), 6);
});

test('estimateReadingTimeMinutes rounds up at 180 wpm with 1 minute minimum', () => {
  assert.equal(estimateReadingTimeMinutes(''), 0);
  assert.equal(estimateReadingTimeMinutes('Short caption.'), 1);

  const sample900Words = Array.from({ length: 900 }, (_, i) => `word${i}`).join(' ');
  assert.equal(estimateReadingTimeMinutes(sample900Words, 180), 5);

  const sample901Words = Array.from({ length: 901 }, (_, i) => `word${i}`).join(' ');
  assert.equal(estimateReadingTimeMinutes(sample901Words, 180), 6);
});

test('formatReadingTime outputs clean editorial label', () => {
  assert.equal(formatReadingTime(7), '7 min read');
  assert.equal(formatReadingTime(0), '1 min read');
});
