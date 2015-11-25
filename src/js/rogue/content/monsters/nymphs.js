
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const waterNymph = { difficulty: 5, spawnPattern: '1d3 + 1', frequency: 0, init: () =>
  ({ glyph: { key: Glyphs.Nymph, fg: GlyphColors.Elements.Water },
  attributes: { ac: -1, speed: 100, level: 3, killXp: '7d7', spawnHp: '5d5 + 5' },
  stats: { name: 'water nymph', race: 'Elf',
    behaviors: [Behaviors.LeavesCorpse(15), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Steals(), Behaviors.Attacks(), Behaviors.DropsItems()],
    attacks: [Attacks.Claw({ roll: '1d2 + 1' }), Attacks.SeductiveTouch({ roll: '1d2', chance: 20 })]
  } }) };

export const forestNymph = { difficulty: 5, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Nymph, fg: GlyphColors.Colors.Green },
    attributes: { ac: -1, speed: 100, level: 3, killXp: '7d7', spawnHp: '5d5 + 5' },
    stats: { name: 'forest nymph', race: 'Elf',
      behaviors: [Behaviors.LeavesCorpse(15), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Steals(), Behaviors.Attacks(), Behaviors.DropsItems()],
      attacks: [Attacks.Claw({ roll: '1d3 + 1' }), Attacks.SeductiveTouch({ roll: '1d3', chance: 30 })]
    } }) };

export const mountainNymph = { difficulty: 25, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Nymph, fg: GlyphColors.Colors.Brown },
    attributes: { ac: -8, speed: 150, level: 3, killXp: '20d7', spawnHp: '20d5' },
    stats: { name: 'mountain nymph', race: 'Elf',
      behaviors: [Behaviors.LeavesCorpse(15), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Steals(), Behaviors.Attacks(), Behaviors.DropsItems()],
      attacks: [Attacks.Claw({ roll: '2d4' }), Attacks.SeductiveTouch({ roll: '2d3', chance: 40 })]
    } }) };