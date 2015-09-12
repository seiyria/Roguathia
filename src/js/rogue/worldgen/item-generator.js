
import _ from 'lodash';
import ROT from 'rot-js';

import * as EquipmentTypes from '../definitions/equipment';

import * as Food from '../content/items/foods';
import * as Feet from '../content/items/feets';
import * as Head from '../content/items/heads';
import * as Body from '../content/items/bodys';
import * as Ring from '../content/items/rings';
import * as Neck from '../content/items/necks';
import * as Wand from '../content/items/wands';
import * as Wrist from '../content/items/wrists';
import * as Cloak from '../content/items/cloaks';
import * as Weapon from '../content/items/_weapons';
import * as Potion from '../content/items/potions';
import * as Spellbook from '../content/items/spellbooks';
import * as Projectile from '../content/items/projectiles';

const itemTypeHash = {
  Food, Feet, Head, Body, Ring, Neck, Wand, Wrist, Cloak, Potion, Spellbook, Hands: _.extend({}, Projectile, Weapon)
};

export default class ItemGenerator {

  static getValidTypes(types) {
    return _(types)
      .keys()
      .filter(key => types[key].rarity)
      .map(key => [key, types[key].rarity])
      .zipObject()
      .value();
  }

  static spawn() {
    const validTypes = this.getValidTypes(EquipmentTypes);
    const chosenType = ROT.RNG.getWeightedValue(validTypes);
    const validItems = this.getValidTypes(itemTypeHash[chosenType]);
    const chosenItem = ROT.RNG.getWeightedValue(validItems);
    return new itemTypeHash[chosenType][chosenItem]();
  }
}