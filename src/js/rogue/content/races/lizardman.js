
import Humanoid from './_humanoid';
import * as Thresholds from '../../constants/skill-thresholds';

const opts = { slots: { hands: 3 }, stats: { dex: 2,
  skillBonus: { slash: Thresholds.Basic, stab: Thresholds.Basic, thrust: Thresholds.Basic }
} };
export default class Lizardman extends Humanoid {
  constructor() {
    super(opts);
  }
}