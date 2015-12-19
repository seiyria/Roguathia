
import { Comestible } from '../../definitions/equipment';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class Ration extends Comestible {
  constructor(opts) {
    super(opts);
    this.realName = 'ration';
  }
}

@rarity(75)
export class Apple extends Comestible {
  constructor(opts) {
    super(opts);
    this.realName = 'apple';
  }
}

@rarity(75)
export class Carrot extends Comestible {
  constructor(opts) {
    super(opts);
    this.realName = 'carrot';
  }
}