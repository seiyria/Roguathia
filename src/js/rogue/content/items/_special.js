
import { Special, Comestible, Gem, Tool } from '../../definitions/equipment';
import { Items as Glyphs } from '../../constants/glyphs';
import { Items as GlyphColors, Special as SpecialGlyphColors } from '../../constants/glyphColors';
import Materials from '../../constants/materials';

export class Gold extends Special {
  get material() { return Materials.Gold; }
  constructor(num) {
    const opts = {
      glyph: { key: Glyphs.Gold, fg: GlyphColors.Gold }
    };
    super(opts);
    this.goldValue = num;
    this.name = `${this.goldValue} gold`;
  }
}

export class Corpse extends Comestible {
  constructor(opts = { monsterName: 'unknown' }) {
    super(opts);
    this.name = `corpse of ${opts.monsterName}`;
  }
}

export class StoneOfSelyk extends Gem {
  constructor() {
    super({ glyph: { fg: SpecialGlyphColors.Selyk } });
    this.name = `Stone of Selyk`;
  }
}

export class SelykCellarKey extends Tool {
  constructor() {
    super({ glyph: { fg: SpecialGlyphColors.Selyk } });
    this.name = `Selyk's Cellar Key`;
  }
}