
import Humanoid from './_humanoid';
import * as Thresholds from '../../constants/skill-thresholds';

const opts = { stats: { dex: -5, str: -5, con: -3, int: 5, wis: 5 },
  skillBonus: { force: Thresholds.Competent }
};
export default class Psionic extends Humanoid {
  constructor() {
    super(opts);
  }
  canEquip(item) {
    return item && item.getType() !== 'hands' && super.canEquip(item);
  }
}
