
import * as Behaviors from '../behaviors/_all';
import * as Attacks from '../attacks/_all';
import * as Weapons from '../items/_weapons';
import * as Spellbooks from '../items/spellbooks';
import * as Projectiles from '../items/projectiles';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

const koboldStartingEquipment = [
  { choices: { dagger: 2, spear: 1, shortsword: 1 },
    choicesInit: {
      dagger: () => new Weapons.OrcishDagger(),
      spear: () => new Weapons.OrcishSpear(),
      shortsword: () => new Weapons.OrcishShortSword()
    }
  },
  { probability: 25, init: () => new Projectiles.Dart({ charges: '1d14 + 3' }) }
];

export const kobold = { difficulty: 1, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Kobold, fg: GlyphColors.Tiers.Weak },
    startingEquipment: koboldStartingEquipment,
    attributes: { speed: 50, level: 1, killXp: '1d10', spawnHp: '3d2' },
    stats: { name: 'kobold', race: 'Kobold',
      behaviors: [Behaviors.LeavesCorpse(55), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };

export const largeKobold = { difficulty: 2, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Kobold, fg: GlyphColors.Tiers.Inadequate },
    startingEquipment: koboldStartingEquipment,
    attributes: { speed: 50, level: 2, killXp: '2d10', spawnHp: '6d2' },
    stats: { name: 'large kobold', race: 'Kobold',
      behaviors: [Behaviors.LeavesCorpse(55), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };

export const koboldLord = { difficulty: 3, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Kobold, fg: GlyphColors.Tiers.Moderate },
    startingEquipment: koboldStartingEquipment,
    attributes: { speed: 50, level: 3, killXp: '3d10', spawnHp: '12d2' },
    stats: { name: 'kobold lord', race: 'Kobold',
      behaviors: [Behaviors.LeavesCorpse(45), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '1d4' })]
    } }) };

export const koboldShaman = { difficulty: 2, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Kobold, fg: GlyphColors.Colors.Blue },
    startingEquipment: [
      { init: () => new Spellbooks.CureSelf() },
      { init: () => new Spellbooks.ForceBolt() }
    ],
    attributes: { speed: 50, level: 2, ac: -4, int: 5, mp: '3d4', killXp: '3d10', spawnHp: '12d3' },
    stats: { name: 'kobold shaman', race: 'Kobold',
      behaviors: [Behaviors.LeavesCorpse(35), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };