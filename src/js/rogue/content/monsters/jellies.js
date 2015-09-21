
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const blueJelly = { difficulty: 9, spawnPattern: '1d1', frequency: 2, init: () =>
  ({ glyph: { key: Glyphs.Jelly, fg: GlyphColors.Colors.Blue },
    attributes: { ac: -6, speed: 50, level: 4, killXp: '10d5', spawnHp: '5d5' },
    stats: { name: 'blue jelly', race: 'Jelly',
      behaviors: [Behaviors.Attacks()],
      attacks: [Attacks.Bite({ roll: '4d6', element: 'Ice' })]
    } }) };