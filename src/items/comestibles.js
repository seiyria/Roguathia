
import {Comestible, Potion} from "../items";

export class Corpse extends Comestible {
  constructor(opts = {monsterName: 'unknown'}) {
    super(opts);
    this.name = `corpse of ${opts.monsterName}`;
  }
}

export class Healing extends Potion {
  constructor(opts = {charges: 1}) {
    _.extend(opts, {healRoll: '4d4', autoRemove: true});
    super(opts);
  }
}