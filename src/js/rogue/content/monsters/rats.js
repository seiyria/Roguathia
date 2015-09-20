
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const sewerRat = { difficulty: 1, spawnPattern: '1d2 + 1', frequency: 45, init: () =>
  ({ glyph: { key: Glyphs.Rat, fg: GlyphColors.Tiers.Weak },
  attributes: { ac: -3, speed: 100, level: 1, killXp: '1d4', spawnHp: '1d2' },
  stats: { name: 'sewer rat', race: 'Rat',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d3' })]
  } }) };