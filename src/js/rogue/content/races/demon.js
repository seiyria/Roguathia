
import Humanoid from './_humanoid';
import * as Traits from '../traits/_all';
import * as Attacks from '../attacks/_all';

const attackProps = {
  roll: '1d3',
  spawnChance: 1,
  spawn: {
    waterDemon: 100
  }
};

const opts = { stats: {
  str: -2, con: -2, dex: -2, int: -2, wis: -2, cha: -2, luk: -2,
  traits: [Traits.PoisonResistance(), Traits.Infravision({ level: 10 }), Traits.Protection({ level: 1 })],
  attacks: [Attacks.Unarmed(attackProps), Attacks.Bite(attackProps), Attacks.Claw(attackProps)]
} };
export default class Demon extends Humanoid {
  constructor() {
    super(opts);
  }
}