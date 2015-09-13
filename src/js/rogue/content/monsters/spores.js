
import * as Behaviors from '../behaviors/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const gasSpore = { difficulty: 2, spawnPattern: '1d1', frequency: 50, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Tiers.Basic },
  attributes: { ac: 0, speed: 25, level: 2, str: 0, dex: 0, con: 0, killXp: '12d1', spawnHp: '2d4' },
  stats: { name: 'gas spore', race: 'Spore',
    behaviors: [Behaviors.Explodes('4d8'), Behaviors.Wanders()]
  } }) };