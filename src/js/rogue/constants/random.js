
import _ from 'lodash';
import * as Foods from '../content/items/foods';
import * as Feets from '../content/items/feets';
import * as Heads from '../content/items/heads';
import * as Bodys from '../content/items/bodys';
import * as Rings from '../content/items/rings';
import * as Necks from '../content/items/necks';
import * as Wands from '../content/items/wands';
import * as Wrists from '../content/items/wrists';
import * as Cloaks from '../content/items/cloaks';
import * as Weapons from '../content/items/weapons';
import * as Potions from '../content/items/potions';
import * as Spellbooks from '../content/items/spellbooks';
import * as Projectiles from '../content/items/projectiles';
import * as Professions from '../content/professions/_all';

const getRandom = (from, exclude = []) => _(from).values().filter((type) => !_.contains(exclude, type.name)).sample();

export const Food = (opts, exclude) => new (getRandom(Foods, exclude))(opts);
export const Feet = (opts, exclude) => new (getRandom(Feets, exclude))(opts);
export const Head = (opts, exclude) => new (getRandom(Heads, exclude))(opts);
export const Body = (opts, exclude) => new (getRandom(Bodys, exclude))(opts);
export const Ring = (opts, exclude) => new (getRandom(Rings, exclude))(opts);
export const Neck = (opts, exclude) => new (getRandom(Necks, exclude))(opts);
export const Wand = (opts, exclude) => new (getRandom(Wands, exclude))(opts);
export const Wrist = (opts, exclude) => new (getRandom(Wrists, exclude))(opts);
export const Cloak = (opts, exclude) => new (getRandom(Cloaks, exclude))(opts);
export const Weapon = (opts, exclude) => new (getRandom(Weapons, exclude))(opts);
export const Potion = (opts, exclude) => new (getRandom(Potions, exclude))(opts);
export const Spellbook = (opts, exclude) => new (getRandom(Spellbooks, exclude))(opts);
export const Projectile = (opts, exclude) => new (getRandom(Projectiles, exclude))(opts);
export const Profession = (opts, exclude = ['Monster', 'Developer']) => new (getRandom(Professions, exclude))(opts);