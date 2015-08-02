
import Entity from "./entity";
import GameState from "./gamestate";

class Tile extends Entity {
  constructor(key, fg, bg) {
    super({key: key, fg: fg, bg: bg});
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
  
  canInteract(entity) {
    return false;
    //return super.canInteract(entity) && this.z !== 0;
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
  
  canInteract(entity) {
    return this.density;
  }
  
  interact(entity) {
    let isOpen = this.glyph.key === '-';
    let toggleChar = isOpen ? '+' : '-';
    this.glyph.key = toggleChar;
    
    this.opacity = !this.opacity;
    this.density = !this.density;
    
    return `${entity.name} ${isOpen ? 'closed': 'opened'} the door.`;
  }
}