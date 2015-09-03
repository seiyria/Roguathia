
import * as Behaviors from '../behaviors/_all';

export const gasSpore =
{ difficulty: 2, glyph: { key: 'e', fg: 'gray' }, spawnPattern: '1d1',  frequency: 50,
  attributes: { ac: 0, speed: 25, level: 2, str: 0, dex: 0, con: 0, killXp: '12d1', spawnHp: '2d4' },
  stats: { name: 'gas spore', race: 'Spore',
    behaviors: [Behaviors.Explodes('4d8'), Behaviors.Wanders()]
  } };