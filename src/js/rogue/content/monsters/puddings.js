
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const blackPudding = { difficulty: 12, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: Glyphs.Pudding, fg: GlyphColors.Colors.Black },
  attributes: { ac: -4, speed: 30, level: 10, killXp: '20d10', spawnHp: '5d5' },
  stats: { name: 'black pudding', race: 'Pudding',
    behaviors: [Behaviors.LeavesCorpse(5), Behaviors.SplitsWhenHit(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Claw({ roll: '3d8' })]
  } }) };