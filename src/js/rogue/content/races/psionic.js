
import Race from '../../definitions/race';

const opts = { stats: { dex: -5, str: -5, con: -3, int: 5, wis: 5 } };
export default class Psionic extends Race {
  constructor() {
    super(opts);
  }
  canEquip(item) {
    return item.getType() !== 'hands' && super.canEquip(item);
  }
}
