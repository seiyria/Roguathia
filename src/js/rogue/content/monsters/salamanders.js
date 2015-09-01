
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export var newt =
{ difficulty: 1, glyph: { key: ':', fg: 'yellow' }, spawnPattern: '1d1', frequency: 150,
  attributes: { ac: -2, speed: 50, level: 1, str: 2, dex: 1, con: 1, killXp: '1d1', spawnHp: '1d4' },
  stats: { name: 'newt', race: 'Salamander',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d3 + 1' })]
  } };