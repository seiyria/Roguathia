
import * as Behaviors from '../behaviors/_all';
import * as Weapons from '../items/_weapons';
import * as Projectiles from '../items/projectiles';
import * as Feets from '../items/feets';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const gnome = { difficulty: 3, spawnPattern: '1d2', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Gnome, fg: GlyphColors.Tiers.Weak },
    startingEquipment: [
      { choices: { bow: 1, crossbow: 1, darts: 1 },
        choicesInit: {
          bow: () => [new Weapons.Bow(), new Projectiles.Arrow({ charges: '1d14 + 3' })],
          crossbow: () => [new Weapons.Crossbow(), new Projectiles.Bolt({ charges: '1d14 + 3' })],
          darts: () => new Projectiles.Dart({ charges: '1d14 + 3' })
        }
      },
      { probability: 25, init: () => new Feets.SimpleBoots() }
    ],
    attributes: { speed: 50, level: 1, killXp: '2d10', spawnHp: '6d2' },
    stats: { name: 'gnome', race: 'Gnome',
      behaviors: [Behaviors.LeavesCorpse(75), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };