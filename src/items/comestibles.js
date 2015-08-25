
import {Comestible} from "../items";

export class Corpse extends Comestible {
  constructor(opts = {monsterName: 'unknown'}) {
    super(opts);
    this.name = `corpse of ${opts.monsterName}`;
  }
}

export class Ration extends Comestible {
  constructor(opts) {
    super(opts);
    this.name = 'ration';
  }
}