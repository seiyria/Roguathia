
import ROT from 'rot-js';
import Tile from '../../definitions/tile';
import GameState from '../../init/gamestate';
import * as FountainEffects from '../../content/effects/fountain';
import * as SinkDrinkEffects from '../../content/effects/sink-drink';
import * as SinkKickEffects from '../../content/effects/sink-kick';

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

  canInteract(entity) {
    return this.distBetween(entity) <= 1;
  }

  interact(entity) {
    entity._ascended = true;
    return `${entity.name} has acended to the Selykian Plane.`;
  }
}

export class Fountain extends Tile {
  constructor() {
    super('{', '#00f');
    this.density = 1;
  }

  canInteract(entity) {
    return this.distBetween(entity) <= 1;
  }

  interact(entity) {
    const effect = this.getRandomEffect(FountainEffects);
    effect.use(entity, this);
    if(ROT.RNG.getPercentage() <= 33) {
      this.ceaseExisting();
      return `The fountain dried up!`;
    }
  }
}

export class Sink extends Tile {
  constructor() {
    super('#', '#d3d3ff');
    this.density = 1;
  }

  canInteract(entity) {
    return this.distBetween(entity) <= 1;
  }

  becomeFountain() {
    GameState.world.placeNewTile(Fountain, this.x, this.y, this.z);
  }

  interact(entity) {
    if(ROT.RNG.getPercentage() <= 0) {
      this.getRandomEffect(SinkDrinkEffects).use(entity, this);
    } else {
      this.getRandomEffect(SinkKickEffects).use(entity, this);
    }

    // break chance
    if(ROT.RNG.getPercentage() <= 0) {

      // it might turn into a fountain, but probably not
      if(ROT.RNG.getPercentage() <= 20) {
        this.becomeFountain();
        return `The pipes explode! Water spurts out!`;
      }

      this.ceaseExisting();
      return `The sink stops providing water.`;
    }
  }
}