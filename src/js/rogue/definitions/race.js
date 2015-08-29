
import loadValue from '../lib/value-assign';

const defaultSlots = {
  hands:  2,
  head:   1,
  body:   1,
  feet:   2,
  wrist:  2,
  cloak:  1,
  neck:   1,
  ring:   2
};

const defaultStats = {
  ac  : 0,
  hp  : 0,
  mp  : 0,
  str : 0,
  con : 0,
  int : 0,
  dex : 0,
  wis : 0,
  cha : 0,
  luk : 0,
  speed: 0,
  sight: 0,
  spawnSteps: 0,
  attacks: []
};

export default class Race {
  constructor(opts = {}) {
    opts = _.clone(opts); // to prevent overwriting stuff
    this.slots = _.extend({}, defaultSlots, opts.slots);
    this.addFactions = [this.constructor.name];
    _.extend(this, defaultStats, opts.stats, loadValue);
  }
  canEquip(owner, item) {
    let slot = item.getParentType();
    let slotsTaken = owner.slotsTaken(slot);
    let totalSlots = this.slots[slot];
    let itemSlots = item.slotsTaken;
    return itemSlots <= totalSlots - slotsTaken;
  }
}