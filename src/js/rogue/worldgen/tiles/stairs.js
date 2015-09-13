
import Tile from '../../definitions/tile';
import GameState from '../../init/gamestate';
import { SelykCellarKey } from '../../content/items/_special';
import { Tiles as Glyphs } from '../../constants/glyphs';
import { Special as SpecialGlyphColors } from '../../constants/glyphColors';

class Stairs extends Tile {
  canInteract(entity) {
    return this.distBetween(entity) === 0;
  }
}
export class StairsDown extends Stairs {
  constructor() { super(Glyphs.StairsDown); }

  canInteract(entity) {
    return super.canInteract(entity) && entity.descend && this.z !== GameState.world.depth - 1;
  }

  interact(entity) {
    entity.descend();
    return `${entity.name} descended the stairs.`;
  }
}
export class SelykStairsDown extends Stairs {
  constructor() { super(Glyphs.StairsDown, SpecialGlyphColors.Selyk); }

  canInteract(entity) {
    return entity.hasInInventory(SelykCellarKey) && entity.descend;
  }

  interact(entity) {
    entity.descend();
    return `${entity.name} descended the stairs to Selyk's Cellar.`;
  }
}
export class StairsUp extends Stairs {
  constructor() { super(Glyphs.StairsUp); }

  canInteract() {
    return false;
    // return super.canInteract(entity) && this.z !== 0;
  }

  interact(entity) {
    entity.ascend();
    return `${entity.name} ascended the stairs.`;
  }
}