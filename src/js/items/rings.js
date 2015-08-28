
import { Ring } from '../items';

export class Protection extends Ring {
  ac() {
    return this.buc * -1;
  }
}
Protection.rarity = 5;

export class Strength extends Ring {
  str() {
    return this.buc;
  }
}
Strength.rarity = 15;

export class Constitution extends Ring {
  con() {
    return this.buc;
  }
}
Constitution.rarity = 5;

export class Dexterity extends Ring {
  dex() {
    return this.buc;
  }
}
Dexterity.rarity = 15;

export class Intelligence extends Ring {
  int() {
    return this.buc;
  }
}
Intelligence.rarity = 20;

export class Wisdom extends Ring {
  wis() {
    return this.buc;
  }
}
Wisdom.rarity = 25;

export class Charisma extends Ring {
  cha() {
    return this.buc;
  }
}
Charisma.rarity = 2;

export class Luck extends Ring {
  luk() {
    return this.buc;
  }
}
Luck.rarity = 1;

export class Speed extends Ring {
  speed() {
    return this.buc;
  }
}
Speed.rarity = 20;

export class Sight extends Ring {
  sight() {
    return this.buc;
  }
}
Sight.rarity = 40;

export class Accuracy extends Ring {
  toHit() {
    return `0d0 +${this.buc}`;
  }
}
Accuracy.rarity = 50;

export class BonusDamage extends Ring {
  bonusDamage() {
    return `0d0 +${this.buc}`;
  }
}
BonusDamage.rarity = 30;