
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const gridBug = { difficulty: 1, spawnPattern: '1d2', frequency: 150, init: () =>
  ({ glyph: { key: Glyphs.Mystical, fg: GlyphColors.Tiers.Basic },
  attributes: { ac: -1, speed: 150, level: 1, str: 5, dex: 3, con: 0, killXp: '4d1', spawnHp: '1d4 + 2' },
  stats: { name: 'grid bug', race: 'Insect',
    behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.ElectricTouch({ roll: '1d3 + 1' })]
  } }) };

export const giantAnt = { difficulty: 4, spawnPattern: '1d4 + 2', frequency: 10, init: () =>
  ({ glyph: { key: Glyphs.Ant, fg: GlyphColors.Tiers.Weak },
  attributes: { ac: -2, speed: 150, level: 3, str: '1d3 + 3', dex: '1d3 + 2', con: 4, killXp: '2d4 + 5', spawnHp: '1d8 + 5' },
  stats: { name: 'giant ant', race: 'Insect',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('2d4'), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d4 + 1' })]
  } }) };

export const killerBee = { difficulty: 12, spawnPattern: '3d4', frequency: 2, init: () =>
  ({ glyph: { key: Glyphs.Ant, fg: GlyphColors.Tiers.Inadequate },
    attributes: { ac: -11, speed: 150, level: 7, killXp: '7d4 + 5', spawnHp: '3d4' },
    stats: { name: 'killer bee', race: 'Insect',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Poison({ roll: '1d3', percent: 33 })]
    } }) };

export const soldierAnt = { difficulty: 13, spawnPattern: '2d4 + 3', frequency: 2, init: () =>
  ({ glyph: { key: Glyphs.Ant, fg: GlyphColors.Tiers.Inadequate },
    attributes: { ac: -7, speed: 150, level: 6, killXp: '10d4', spawnHp: '4d4' },
    stats: { name: 'soldier ant', race: 'Insect',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '2d4' }), Attacks.Poison({ roll: '3d4', percent: 33 })]
    } }) };

export const fireAnt = { difficulty: 11, spawnPattern: '2d4 + 3', frequency: 2, init: () =>
  ({ glyph: { key: Glyphs.Ant, fg: GlyphColors.Elements.Fire },
    attributes: { ac: -7, speed: 150, level: 5, killXp: '10d4', spawnHp: '3d6' },
    stats: { name: 'fire ant', race: 'Insect',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '2d4' }), Attacks.Bite({ roll: '2d4', element: 'Fire' })]
    } }) };

export const giantBeetle = { difficulty: 7, spawnPattern: '1d3', frequency: 5, init: () =>
  ({ glyph: { key: Glyphs.Ant, fg: GlyphColors.Elements.Fire },
    attributes: { ac: -6, speed: 50, level: 5, killXp: '10d4', spawnHp: '3d6' },
    stats: { name: 'giant beetle', race: 'Insect',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '3d6' })]
    } }) };