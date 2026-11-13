import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterMilestonesByDecade,
  getMatchingDossiersForDecade,
  getVisibleChaptersForDecade,
} from './timeline';

test('filterMilestonesByDecade returns all milestones for all and scopes each decade cleanly', () => {
  const all = filterMilestonesByDecade('all');
  assert.equal(all.length, 9);

  const sixties = filterMilestonesByDecade('1960s');
  assert.equal(sixties.length, 1);
  assert.equal(sixties[0].id, 'apollo-11-lrrr');

  const seventies = filterMilestonesByDecade('1970s');
  assert.equal(seventies.length, 4);

  const twoThousands = filterMilestonesByDecade('2000s');
  assert.equal(twoThousands.length, 2);

  const twentyTens = filterMilestonesByDecade('2010s');
  assert.equal(twentyTens.length, 2);
});

test('getVisibleChaptersForDecade shows only chapters containing relics from selected decade', () => {
  assert.deepEqual(getVisibleChaptersForDecade('all'), {
    showPrologue: true,
    showMoon: true,
    showMars: true,
    showDeepSpace: true,
  });

  assert.deepEqual(getVisibleChaptersForDecade('1960s'), {
    showPrologue: false,
    showMoon: true,
    showMars: false,
    showDeepSpace: false,
  });

  assert.deepEqual(getVisibleChaptersForDecade('2000s'), {
    showPrologue: false,
    showMoon: false,
    showMars: true,
    showDeepSpace: true,
  });
});

test('getMatchingDossiersForDecade isolates exact relics per decade', () => {
  const sixtiesDossiers = getMatchingDossiersForDecade('1960s');
  assert.equal(sixtiesDossiers.has('lrrr'), true);
  assert.equal(sixtiesDossiers.has('lrv'), false);

  const twentyTensDossiers = getMatchingDossiersForDecade('2010s');
  assert.equal(twentyTensDossiers.has('voyager'), true);
  assert.equal(twentyTensDossiers.has('opportunity'), true);
  assert.equal(twentyTensDossiers.has('viking'), false);
});
