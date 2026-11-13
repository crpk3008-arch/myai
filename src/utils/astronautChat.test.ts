import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ASTRONAUT_STARTER_QUESTIONS,
  buildAstronautSystemInstruction,
  extractLatestUserTurnAndPriorHistory,
  sanitizeChatHistory,
} from './astronautChat';

test('buildAstronautSystemInstruction stays in astronaut persona across reading modes', () => {
  const junior = buildAstronautSystemInstruction('junior');
  const cadet = buildAstronautSystemInstruction('cadet');
  assert.ok(junior.includes('Commander Nova'));
  assert.ok(junior.includes('ages 7–11'));
  assert.ok(cadet.includes('ages 12–17'));
  assert.ok(ASTRONAUT_STARTER_QUESTIONS.length >= 3);
});

test('sanitizeChatHistory filters invalid records and trims long inputs', () => {
  const result = sanitizeChatHistory([
    { role: 'system', text: 'ignore' },
    { role: 'model', text: '   Welcome!  ' },
    { role: 'user', text: '   ' },
    { role: 'user', text: 'How fast is the Moon buggy?' },
  ]);
  assert.deepEqual(result, [
    { role: 'model', text: 'Welcome!' },
    { role: 'user', text: 'How fast is the Moon buggy?' },
  ]);
});

test('extractLatestUserTurnAndPriorHistory strips leading greeting and splits latest message', () => {
  const extracted = extractLatestUserTurnAndPriorHistory([
    { role: 'model', text: 'Greeting from orbit!' },
    { role: 'user', text: 'Why leave rovers behind?' },
    { role: 'model', text: 'Rocket fuel math!' },
    { role: 'user', text: 'How much fuel?' },
  ]);

  assert.ok(extracted);
  assert.equal(extracted.latestUserMessage, 'How much fuel?');
  assert.equal(extracted.priorHistory.length, 2);
  assert.equal(extracted.priorHistory[0].role, 'user');
  assert.equal(extracted.priorHistory[1].role, 'model');
});

test('extractLatestUserTurnAndPriorHistory returns null when last message is not from user', () => {
  const extracted = extractLatestUserTurnAndPriorHistory([
    { role: 'user', text: 'Hi' },
    { role: 'model', text: 'Hello Explorer!' },
  ]);
  assert.equal(extracted, null);
});
