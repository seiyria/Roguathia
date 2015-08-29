
import Entity from '../definitions/entity';
import GameState from '../init/gamestate';

class Tile extends Entity {
  constructor(key, fg, bg) {
    super({ key: key, fg: fg, bg: bg });
    this.density = 0;
    this.opacity = 0;
  }
}

export class Void extends Tile { constructor() { super(); this.opacity = 1; }}

export class DungeonFloor extends Tile { constructor() { super('.'); }}

export class DungeonHorizontalWall extends Tile { constructor() { super('-'); this.density = this.opacity = 1; }}
export class DungeonVerticalWall extends Tile { constructor() { super('|'); this.density = this.opacity = 1; }}
export class Corridor extends Tile { constructor() { super('#'); } }

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

export class Door extends Tile {
  constructor() {
    let isClosed = !!Math.round(ROT.RNG.getUniform());
    let openChar = isClosed ? '-' : '+';
    super(openChar, 'gold');
    this._isAIPassable = true;
    
    this.opacity = !~~isClosed;
    this.density = !~~isClosed;
  }
  
  getOpenChar(basedOn) {
    let leftTileGlyph = basedOn.glyph.key;
    return leftTileGlyph === '-' ? '|' : '-';
  }
  
  canInteract() {
    return this.density;
  }
  
  setProperCharacter(basedOn = GameState.world.getTile(this.x - 1, this.y, this.z)) {
    let isOpen = this.density;
    let toggleChar = isOpen ? '+' : this.getOpenChar(basedOn);
    this.glyph.key = toggleChar;
  }
  
  interact(entity) {
    this.opacity = !this.opacity;
    this.density = !this.density;
    this.setProperCharacter();
    
    return `${entity.name} ${this.density ? 'closed': 'opened'} the door.`;
  }
}