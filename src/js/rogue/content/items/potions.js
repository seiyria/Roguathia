
import _ from 'lodash';
import Roll from '../../lib/dice-roller';
import { Potion } from '../../definitions/equipment';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class Healing extends Potion {
  constructor(opts = {}) {
    _.extend(opts, { charges: '1d1', healRoll: '4d4', autoRemove: true });
    super(opts);
  }
  use(entity) {
    const healVal = Roll(this.healRoll);
    super.use(entity, { healVal, messageFinish: `regained ${healVal} health` });
  }
}