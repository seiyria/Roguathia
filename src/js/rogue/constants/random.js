
import * as Foods from '../content/items/foods';
import * as Feets from '../content/items/feets';
import * as Heads from '../content/items/heads';
import * as Bodys from '../content/items/bodys';
import * as Rings from '../content/items/rings';
import * as Wands from '../content/items/wands';
import * as Wrists from '../content/items/wrists';
import * as Cloaks from '../content/items/cloaks';
import * as Weapons from '../content/items/weapons';
import * as Potions from '../content/items/potions';
import * as Spellbooks from '../content/items/spellbooks';
import * as Projectiles from '../content/items/projectiles';

let getRandom = (from, exclude = []) => _(from).values().filter((type) => !_.contains(exclude, type.name)).sample();

export var Food = (opts, exclude) => new (getRandom(Foods, exclude))(opts);
export var Feet = (opts, exclude) => new (getRandom(Feets, exclude))(opts);
export var Head = (opts, exclude) => new (getRandom(Heads, exclude))(opts);
export var Body = (opts, exclude) => new (getRandom(Bodys, exclude))(opts);
export var Ring = (opts, exclude) => new (getRandom(Rings, exclude))(opts);
export var Wand = (opts, exclude) => new (getRandom(Wands, exclude))(opts);
export var Wrist = (opts, exclude) => new (getRandom(Wrists, exclude))(opts);
export var Cloak = (opts, exclude) => new (getRandom(Cloaks, exclude))(opts);
export var Weapon = (opts, exclude) => new (getRandom(Weapons, exclude))(opts);
export var Potion = (opts, exclude) => new (getRandom(Potions, exclude))(opts);
export var Spellbook = (opts, exclude) => new (getRandom(Spellbooks, exclude))(opts);
export var Projectile = (opts, exclude) => new (getRandom(Projectiles, exclude))(opts);