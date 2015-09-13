
import * as Behaviors from '../behaviors/_all';
import * as Weapons from '../items/_weapons';
import * as Projectiles from '../items/projectiles';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const kobold = { difficulty: 1, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Kobold, fg: GlyphColors.Tiers.Weak },
    startingEquipment: [
      { choices: { dagger: 2, spear: 1, shortsword: 1 },
        choicesInit: {
          dagger: () => new Weapons.OrcishDagger(),
          spear: () => new Weapons.OrcishSpear(),
          shortsword: () => new Weapons.OrcishShortSword()
        }
      },
      { probability: 25, init: () => new Projectiles.Dart({ charges: '1d14 + 3' }) }
    ],
    attributes: { speed: 50, level: 1, killXp: '1d10', spawnHp: '3d2' },
    stats: { name: 'kobold', race: 'Orc',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };