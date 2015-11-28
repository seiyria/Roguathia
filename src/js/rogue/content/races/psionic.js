
import _ from 'lodash';

import Humanoid from './_humanoid';
import * as Thresholds from '../../constants/skill-thresholds';

const opts = { stats: { dex: -5, str: -5, con: -3, int: 5, wis: 5 },
  skillBonus: { force: Thresholds.Competent }
};
export default class Psionic extends Humanoid {
  constructor() {
    super(opts);
  }
  canEquip(owner, item) {
    return item && !_.contains(['weapon', 'hands'], item.getParentType()) && super.canEquip(owner, item);
  }
}
