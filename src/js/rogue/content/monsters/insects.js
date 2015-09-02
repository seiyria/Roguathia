
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export var gridBug =
{ difficulty: 1, glyph: { key: 'x', fg: 'purple' }, spawnPattern: '1d2', frequency: 150,
  attributes: { ac: -1, speed: 150, level: 1, str: 5, dex: 3, con: 0, killXp: '4d1', spawnHp: '1d4 + 2' },
  stats: { name: 'grid bug', race: 'Insect',
    behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.ElectricTouch({ roll: '1d3 + 1' })]
  } };

export var giantAnt =
{ difficulty: 4, glyph: { key: 'a', fg: 'brown' }, spawnPattern: '1d4 + 2',  frequency: 10,
  attributes: { ac: -2, speed: 150, level: 3, str: '1d3 + 3', dex: '1d3 + 2', con: 4, killXp: '2d4 + 5', spawnHp: '1d8 + 5' },
  stats: { name: 'giant ant', race: 'Insect',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('2d4'), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Bite({ roll: '1d4 + 1' })]
  } };