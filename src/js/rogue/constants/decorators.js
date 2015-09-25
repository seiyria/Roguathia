
import _ from 'lodash';

export const rarity = (rarity) => (target) => { return target.__defineGetter__('rarity', () => rarity), target; };
export const material = (material) => (target) => { return target.prototype.material = material, target; };
export const twoHanded = (target) => { return target.prototype.slotsTaken = 2, target; };
export const ranged = (range) => (target) => {
  return target.prototype.range = _.extend({ numShots: 1, damageBoost: '0d0', ammo: [] }, range), target;
};
