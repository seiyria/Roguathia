
import _ from 'lodash';
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
  addFactions: [],
  addBehaviors: [],
  attacks: [],
  traits: [],
  skillBonus: {}
};

export default class Race {
  constructor(opts = {}) {
    this.slots = _.extend({}, defaultSlots, opts.slots);
    _.extend(this, defaultStats, opts.stats, loadValue);
    this.addFactions.push(this.constructor.name);
  }
  canEquip(owner, item) {
    const slot = item.getParentType();
    const slotsTaken = owner.slotsTaken(slot);
    const totalSlots = this.slots[slot];
    const itemSlots = item.slotsTaken;
    return itemSlots <= totalSlots - slotsTaken;
  }
}