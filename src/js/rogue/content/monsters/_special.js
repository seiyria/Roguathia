
import { Wand as RandomWand } from '../../constants/random';
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export const Selyk = { difficulty: 10, spawnPattern: '1d1', frequency: 0, init: () =>
  ({ glyph: { key: 'h', fg: '#f0f' },
  attributes: { ac: -10, speed: 200, level: 20, str: '2d10', con: '2d10', int: '3d10', mp: '5d10', killXp: '50d10', spawnHp: '5d10 + 25' },
  stats: { name: 'Selyk', race: 'Human', profession: 'Wizard',
    startingEquipment: [
      { init: () => RandomWand({ bucName: 'blessed', charges: '5d5' }) }
    ],
    behaviors: [Behaviors.Bloodthirsty(), Behaviors.Attacks(), Behaviors.TeleportsWhenHit(), Behaviors.OpensDoors()],
    attacks: [Attacks.ElectricTouch({ roll: '1d1', toHit: '1d5' })]
  } }) };