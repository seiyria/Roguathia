
import * as Behaviors from '../behaviors/_all';
import * as Weapons from '../items/_weapons';
import * as Heads from '../items/heads';
import * as Bodys from '../items/bodys';
import * as Feets from '../items/feets';
import * as Projectiles from '../items/projectiles';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const goblin = { difficulty: 1, spawnPattern: '1d1', frequency: 6, init: () =>
  ({ glyph: { key: Glyphs.Orc, fg: GlyphColors.Tiers.Basic },
    startingEquipment: [
      { probability: 50, init: () => new Weapons.OrcishDagger() },
      { probability: 50, init: () => new Heads.OrcishHelm() },
      { probability: 25, init: () => new Feets.SimpleBoots() }
    ],
    attributes: { speed: 75, level: 1, killXp: '1d15', spawnHp: '6d2' },
    stats: { name: 'goblin', race: 'Orc',
      behaviors: [Behaviors.LeavesCorpse(75), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };

export const hobgoblin = { difficulty: 3, spawnPattern: '1d1', frequency: 6, init: () =>
  ({ glyph: { key: Glyphs.Orc, fg: GlyphColors.Tiers.Weak },
    startingEquipment: [
      { choices: { dagger: 1, shortsword: 1 },
        choicesInit: {
          dagger: () => new Weapons.OrcishDagger(),
          shortsword: () => new Weapons.OrcishShortSword()
        }
      },
      { probability: 50, init: () => new Heads.OrcishHelm() },
      { probability: 25, init: () => new Feets.SimpleBoots() }
    ],
    attributes: { speed: 75, level: 1, killXp: '1d15', spawnHp: '6d2' },
    stats: { name: 'hobgoblin', race: 'Orc',
      behaviors: [Behaviors.LeavesCorpse(75), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };

export const orc = { difficulty: 3, spawnPattern: '1d1', frequency: 0, init: () =>
  ({ glyph: { key: Glyphs.Orc, fg: GlyphColors.Tiers.Inadequate },
    startingEquipment: [
      { choices: { sword: 1, bow: 1 },
        choicesInit: {
          sword: () => new Weapons.Scimitar(),
          bow: () => [new Weapons.OrcishBow(), new Projectiles.OrcishArrow({ charges: '1d14 + 3' })]
        }
      },
      { probability: 50, init: () => new Heads.OrcishHelm() },
      { probability: 50, init: () => new Bodys.OrcishRingMail() },
      { probability: 25, init: () => new Feets.SimpleBoots() }
    ],
    attributes: { speed: 75, level: 1, killXp: '1d15', spawnHp: '6d2' },
    stats: { name: 'orc', race: 'Orc',
      behaviors: [Behaviors.LeavesCorpse(75), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()]
    } }) };