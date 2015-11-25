
import Humanoid from './_humanoid';
import * as Thresholds from '../../constants/skill-thresholds';

const opts = { stats: { str: 1, con: 1, dex: 1, int: 1, wis: 1, cha: 1, luk: 1, sight: -1,
  skillBonus: { basic: Thresholds.Basic, slash: Thresholds.Basic, smash: Thresholds.Basic, stab: Thresholds.Basic, thrust: Thresholds.Basic, unarmed: Thresholds.Basic }
} };
export default class Human extends Humanoid {
  constructor() {
    super(opts);
  }
}