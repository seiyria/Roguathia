
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';
import * as Foods from '../items/foods';

export var jackal =
{ difficulty: 2, glyph: { key: 'd', fg: 'brown' }, spawnPattern: '1d3 + 1',  frequency: 55,
  startingEquipment: [
    { probability: 20, init: () => new Foods.Ration({ charges: '1d2' }) }
  ],
  attributes: { ac: -3, speed: 125, level: 1, str: '1d4 + 2', dex: '2d3 + 4', con: 4, killXp: '2d3 + 3', spawnHp: '3d3 + 5' },
  stats: { name: 'jackal', race: 'Canine',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('1d10'), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.DropsItems()],
    attacks: [Attacks.Bite({ roll: '1d2 + 1', toHit: '1d2' })]
  } };

export var fox =
{ difficulty: 1, glyph: { key: 'd', fg: 'orange' }, spawnPattern: '1d3 + 1',  frequency: 100,
  attributes: { ac: -1, speed: 150, level: 1, str: '1d3', dex: '1d3 + 4', con: 4, killXp: '2d3 + 3', spawnHp: '1d3 + 5' },
  stats: { name: 'fox', race: 'Canine',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('1d10'), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.DropsItems()],
    attacks: [Attacks.Bite({ roll: '1d2 + 1' })]
  } };