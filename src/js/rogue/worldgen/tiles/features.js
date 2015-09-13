
import ROT from 'rot-js';
import Tile from '../../definitions/tile';
import GameState from '../../init/gamestate';
import * as FountainEffects from '../../content/effects/fountain';
import * as ThroneEffects from '../../content/effects/throne';
import * as SinkDrinkEffects from '../../content/effects/sink-drink';
import * as SinkKickEffects from '../../content/effects/sink-kick';
import { Tiles as Glyphs } from '../../constants/glyphs';
import { Special as SpecialGlyphColors, Tiles as GlyphColors } from '../../constants/glyphColors';

export class Door extends Tile {
  constructor() {
    const isClosed = !!Math.round(ROT.RNG.getUniform());
    const openChar = isClosed ? Glyphs.DoorOpenHorizontal : Glyphs.DoorClosed;
    super(openChar, GlyphColors.Door);
    this._isAIPassable = true;

    this.opacity = !~~isClosed;
    this.density = !~~isClosed;
  }

  // the door should look different than the walls next to it
  getOpenChar(basedOn) {
    const leftTileGlyph = basedOn.glyph.key;
    return leftTileGlyph === Glyphs.DoorOpenHorizontal ? Glyphs.DoorOpenVertical : Glyphs.DoorOpenHorizontal;
  }

  canInteract() {
    return this.density;
  }

  setProperCharacter(basedOn = GameState.world.getTile(this.x - 1, this.y, this.z)) {
    const isOpen = this.density;
    const toggleChar = isOpen ? Glyphs.DoorClosed : this.getOpenChar(basedOn);
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
  constructor() { super(Glyphs.Altar, SpecialGlyphColors.Selyk); }

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
    super(Glyphs.Fountain, GlyphColors.Fountain);
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

export class Throne extends Tile {
  constructor() {
    super(Glyphs.Throne, GlyphColors.Throne);
  }

  canInteract(entity) {
    return this.distBetween(entity) === 0;
  }

  interact(entity) {
    const effect = this.getRandomEffect(ThroneEffects);
    effect.use(entity, this);
    if(ROT.RNG.getPercentage() <= 33) {
      this.ceaseExisting();
      return `The throne vanishes in a puff of logic!`;
    }
  }
}

export class Sink extends Tile {
  constructor() {
    super(Glyphs.Sink, GlyphColors.Sink);
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