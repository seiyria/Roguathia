
import ROT from 'rot-js';
import Tile from '../../definitions/tile';
import GameState from '../../init/gamestate';

export class Door extends Tile {
  constructor() {
    const isClosed = !!Math.round(ROT.RNG.getUniform());
    const openChar = isClosed ? '-' : '+';
    super(openChar, 'gold');
    this._isAIPassable = true;

    this.opacity = !~~isClosed;
    this.density = !~~isClosed;
  }

  getOpenChar(basedOn) {
    const leftTileGlyph = basedOn.glyph.key;
    return leftTileGlyph === '-' ? '|' : '-';
  }

  canInteract() {
    return this.density;
  }

  setProperCharacter(basedOn = GameState.world.getTile(this.x - 1, this.y, this.z)) {
    const isOpen = this.density;
    const toggleChar = isOpen ? '+' : this.getOpenChar(basedOn);
    this.glyph.key = toggleChar;
  }

  interact(entity) {
    this.opacity = !this.opacity;
    this.density = !this.density;
    this.setProperCharacter();

    return `${entity.name} ${this.density ? 'closed': 'opened'} the door.`;
  }
}

export class SelykAltar extends Tile {
  constructor() { super('_', '#f0f'); }

  canInteract() {
    return true;
  }

  interact(entity) {
    entity._ascended = true;
    return `${entity.name} has acended to the Selykian Plane.`;
  }
}