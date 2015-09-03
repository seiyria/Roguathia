
import Random from '../../constants/random';
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export const Selyk =
{ difficulty: 10, glyph: { key: 'h', fg: 'yellow' }, spawnPattern: '1d1',  frequency: 0,
  attributes: { ac: -15, speed: 200, level: 20, str: '1d4 + 2', dex: '2d3 + 4', con: 4, killXp: '2d3 + 3', spawnHp: '3d3 + 5' },
  stats: { name: 'Selyk', race: 'Human', profession: Random.Profession(),
    behaviors: [Behaviors.Bloodthirsty(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d2 + 1', toHit: '1d2' })]
  } };