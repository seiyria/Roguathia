
import { Neck } from '../../definitions/equipment';
import Materials from '../../constants/materials';
import * as Behaviors from '../behaviors/_all';
import { material, rarity } from '../../constants/decorators';

@rarity(50)
@material(Materials.Iron)
export class Necklace extends Neck {}

@rarity(5)
@material(Materials.Iron)
export class AmuletOfProtection extends Neck {
  Protection() { return this.buc * -2; }
}

@rarity(1)
@material(Materials.Iron)
export class AmuletOfTelepathy extends Neck {
  Telepathy() { return 4; }
}

@rarity(1)
@material(Materials.Iron)
export class AmuletOfStrangulation extends Neck {
  equip(player) {
    player.die({ name: 'amulet of strangulation' });
  }
}

@rarity(1)
@material(Materials.Iron)
export class AmuletOfLifeSaving extends Neck {
  equip(player) {
    this._behavior = Behaviors.LifeSave();
    this._behavior._itemRef = this;
    player.addUniqueBehavior(this._behavior);
  }
  unequip(player) {
    player.removeBehavior(this._behavior);
  }
}
