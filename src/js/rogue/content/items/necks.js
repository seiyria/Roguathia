
import { Neck } from '../../definitions/equipment';
import Materials from '../../constants/materials';
import * as Behaviors from '../behaviors/_all';

export class Necklace extends Neck {
  static get rarity() { return 50; }
  get material() { return Materials.Iron; }
}

export class AmuletOfProtection extends Neck {
  static get rarity() { return 5; }
  get material() { return Materials.Iron; }
  Protection() {
    return this.buc * -2;
  }
}

export class AmuletOfTelepathy extends Neck {
  static get rarity() { return 1; }
  get material() { return Materials.Iron; }
  Telepathy() { return 20; }
}

export class AmuletOfStrangulation extends Neck {
  static get rarity() { return 1; }
  get material() { return Materials.Iron; }
  equip(player) {
    player.die({ name: 'amulet of strangulation' });
  }
}

export class AmuletOfLifeSaving extends Neck {
  static get rarity() { return 1; }
  get material() { return Materials.Iron; }
  equip(player) {
    this._behavior = Behaviors.LifeSave();
    this._behavior._itemRef = this;
    player.addUniqueBehavior(this._behavior);
  }
  unequip(player) {
    player.removeBehavior(this._behavior);
  }
}
