
import { Special, Comestible, Gem, Tool } from '../../definitions/equipment';
import { Items as Glyphs } from '../../constants/glyphs';
import { Items as GlyphColors, Special as SpecialGlyphColors } from '../../constants/glyphColors';
import { material } from '../../constants/decorators';
import Materials from '../../constants/materials';

@material(Materials.Gold)
export class Gold extends Special {
  constructor(num) {
    const opts = {
      glyph: { key: Glyphs.Gold, fg: GlyphColors.Gold }
    };
    super(opts);
    this.goldValue = num;
    this.realName = `${this.goldValue} gold`;
  }
}

export class Corpse extends Comestible {
  constructor(opts = { monsterName: 'unknown' }) {
    super(opts);
    this.realName = `corpse of ${opts.monsterName}`;
  }
}

export class StoneOfSelyk extends Gem {
  constructor() {
    super({ glyph: { fg: SpecialGlyphColors.Selyk } });
    this.realName = `Stone of Selyk`;
  }
}

export class SelykCellarKey extends Tool {
  constructor() {
    super({ glyph: { fg: SpecialGlyphColors.Selyk } });
    this.realName = `Selyk's Cellar Key`;
  }
}