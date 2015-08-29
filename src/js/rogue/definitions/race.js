

let defaultSlots = {
  hands:  2,
  head:   1,
  body:   1,
  feet:   2,
  wrist:  2,
  cloak:  1,
  neck:   1,
  ring:   2
};

export default class Race {
  constructor(opts = {}) {
    this.slots = _.extend({}, defaultSlots, opts.slots);
    this.addFactions = [this.constructor.name];
  }
  canEquip(owner, item) {
    let slot = item.getParentType();
    let slotsTaken = owner.slotsTaken(slot);
    let totalSlots = this.slots[slot];
    let itemSlots = item.slotsTaken;
    return itemSlots <= totalSlots - slotsTaken;
  }
}