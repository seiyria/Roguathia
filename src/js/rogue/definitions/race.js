
import _ from 'lodash';
import loadValue from '../lib/value-assign';
import Settings from '../constants/settings';
import Log from '../lib/logger';

export default class Race {
  constructor(opts = {}) {
    this.slots = _.extend({}, Settings.game.defaultStats.equipmentSlots, opts.slots);
    _.extend(this, _.cloneDeep(Settings.game.defaultStats.race), opts.stats, loadValue);
    this.addFactions.push(this.constructor.name);
  }
  canEquip(owner, item) {
    if(!item) {
      Log('Race', 'Invalid item');
    }
    const slot = item.getParentType();
    const slotsTaken = owner.slotsTaken(slot);
    const totalSlots = this.slots[slot];
    const itemSlots = item.slotsTaken;
    return itemSlots <= totalSlots - slotsTaken;
  }
}