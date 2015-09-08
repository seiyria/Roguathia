
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export const waterElemental = { difficulty: 10, spawnPattern: '1d2 + 1', frequency: 1, init: () =>
  ({ glyph: { key: 'E', fg: 'blue' },
  attributes: { ac: -8, speed: 50, level: 8, killXp: '13d10', spawnHp: '7d7' },
  stats: { name: 'water elemental', race: 'Elemental',
    behaviors: [Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Claw({ roll: '5d6' })]
  } }) };