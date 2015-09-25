
import { Neck } from '../../definitions/equipment';
import Materials from '../../constants/materials';
import * as Behaviors from '../behaviors/_all';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class Necklace extends Neck {
  get material() { return Materials.Iron; }
}

@rarity(5)
export class AmuletOfProtection extends Neck {
  get material() { return Materials.Iron; }
  Protection() {
    return this.buc * -2;
  }
}

@rarity(1)
export class AmuletOfTelepathy extends Neck {
  get material() { return Materials.Iron; }
  Telepathy() { return 20; }
}

@rarity(1)
export class AmuletOfStrangulation extends Neck {
  get material() { return Materials.Iron; }
  equip(player) {
    player.die({ name: 'amulet of strangulation' });
  }
}

@rarity(1)
export class AmuletOfLifeSaving extends Neck {
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
