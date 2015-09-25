
export const rarity   = (rarity) => (target) => { return target.__defineGetter__('rarity', () => rarity), target; };
