
import Tile from '../../definitions/tile';
import GameState from '../../init/gamestate';
import { SelykCellarKey } from '../../content/items/_special';

class Stairs extends Tile {
  canInteract(entity) {
    return this.distBetween(entity) === 0;
  }
}
export class StairsDown extends Stairs {
  constructor() { super('>'); }

  canInteract(entity) {
    return super.canInteract(entity) && this.z !== GameState.world.depth - 1;
  }

  interact(entity) {
    entity.descend();
    return `${entity.name} descended the stairs.`;
  }
}
export class SelykStairsDown extends Stairs {
  constructor() { super('>', '#f0f'); }

  canInteract(entity) {
    return entity.hasInInventory(SelykCellarKey);
  }

  interact(entity) {
    entity.descend();
    return `${entity.name} descended the stairs to Selyk's Cellar.`;
  }
}
export class StairsUp extends Stairs {
  constructor() { super('<'); }

  canInteract() {
    return false;
    // return super.canInteract(entity) && this.z !== 0;
  }

  interact(entity) {
    entity.ascend();
    return `${entity.name} ascended the stairs.`;
  }
}