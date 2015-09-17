
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import * as Weapons from '../items/_weapons';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const newt = { difficulty: 1, spawnPattern: '1d1', frequency: 150, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Yellow },
  attributes: { ac: -2, speed: 50, level: 1, killXp: '1d1', spawnHp: '1d4' },
  stats: { name: 'newt', race: 'Lizard',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d2' })]
  } }) };

export const gecko = { difficulty: 2, spawnPattern: '1d1', frequency: 125, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Green },
    attributes: { ac: -2, speed: 50, level: 2, killXp: '1d8', spawnHp: '2d4' },
    stats: { name: 'gecko', race: 'Lizard',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '1d3' })]
    } }) };

export const iguana = { difficulty: 3, spawnPattern: '1d1', frequency: 100, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Brown },
    attributes: { ac: -3, speed: 50, level: 3, killXp: '3d8', spawnHp: '4d4' },
    stats: { name: 'iguana', race: 'Lizard',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '1d4' })]
    } }) };

export const babyCrocodile = { difficulty: 3, spawnPattern: '1d2', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Brown },
    attributes: { ac: -3, speed: 25, level: 3, killXp: '3d8', spawnHp: '3d7' },
    stats: { name: 'baby crocodile', race: 'Lizard',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '1d4' })]
    } }) };

export const crocodile = { difficulty: 7, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Brown },
    attributes: { ac: -5, speed: 50, level: 6, killXp: '7d12', spawnHp: '4d10' },
    stats: { name: 'crocodile', race: 'Lizard',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '4d2' }), Attacks.Claw({ roll: '1d12' })]
    } }) };

export const chameleon = { difficulty: 7, spawnPattern: '1d1', frequency: 5, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Brown },
    attributes: { ac: -5, speed: 75, level: 6, killXp: '7d12', spawnHp: '3d10' },
    stats: { name: 'chameleon', race: 'Lizard',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '4d2' })]
    } }) };

export const salamander = { difficulty: 17, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Lizard, fg: GlyphColors.Colors.Red },
    addFactions: ['Lizard'],
    startingEquipment: [
      { choices: { spear: 18, trident: 2, stiletto: 1 },
        choicesInit: {
          spear: () => new Weapons.Spear(),
          trident: () => new Weapons.Trident(),
          stiletto: () => new Weapons.Stiletto()
        }
      }
    ],
    attributes: { ac: -11, speed: 100, level: 10, killXp: '20d10', spawnHp: '4d20' },
    stats: { name: 'salamander', race: 'Lizardman',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [
        Attacks.Bearhug({ roll: '2d6' }),
        Attacks.Bearhug({ roll: '3d6', element: 'Fire' }),
        Attacks.Touch({ roll: '1d6', element: 'Fire' })]
    } }) };