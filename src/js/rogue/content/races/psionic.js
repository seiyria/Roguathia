
import Race from '../../definitions/race';

export default class Psionic extends Race {
  canEquip(item) {
    return item.getType() !== 'hands' && super.canEquip(item);
  }
}
