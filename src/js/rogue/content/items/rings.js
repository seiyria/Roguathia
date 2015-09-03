
import { Ring } from '../../definitions/equipment';

export class Protection extends Ring {
  static get rarity() { return 5; }
  protection() {
    return this.buc;
  }
}

export class Strength extends Ring {
  static get rarity() { return 15; }
  str() {
    return this.buc;
  }
}

export class Constitution extends Ring {
  static get rarity() { return 5; }
  con() {
    return this.buc;
  }
}

export class Dexterity extends Ring {
  static get rarity() { return 15; }
  dex() {
    return this.buc;
  }
}

export class Intelligence extends Ring {
  static get rarity() { return 20; }
  int() {
    return this.buc;
  }
}

export class Wisdom extends Ring {
  static get rarity() { return 25; }
  wis() {
    return this.buc;
  }
}

export class Charisma extends Ring {
  static get rarity() { return 2; }
  cha() {
    return this.buc;
  }
}

export class Luck extends Ring {
  static get rarity() { return 1; }
  luk() {
    return this.buc;
  }
}

export class Speed extends Ring {
  static get rarity() { return 4; }
  Haste() {
    return this.buc * 25;
  }
}

export class Sight extends Ring {
  static get rarity() { return 1; }
  Infravision() {
    return this.buc;
  }
}

export class Accuracy extends Ring {
  static get rarity() { return 50; }
  toHit() {
    return `0d0 +${this.buc}`;
  }
}

export class BonusDamage extends Ring {
  static get rarity() { return 30; }
  bonusDamage() {
    return `0d0 +${this.buc}`;
  }
}