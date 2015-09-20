
import * as Behaviors from '../behaviors/_all';
import * as Attacks from '../attacks/_all';
import * as Traits from '../traits/_all';
import { Entities as Glyphs } from '../../constants/glyphs';
import { Entities as GlyphColors } from '../../constants/glyphColors';

export const gasSpore = { difficulty: 2, spawnPattern: '1d1', frequency: 15, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Tiers.Basic },
  attributes: { ac: 0, speed: 25, level: 2, killXp: '12d1', spawnHp: '2d4' },
  stats: { name: 'gas spore', race: 'Spore',
    behaviors: [Behaviors.Explodes('4d8', 3), Behaviors.Wanders()]
  } }) };

export const floatingEye = { difficulty: 3, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Tiers.Weak },
    attributes: { ac: -1, speed: 10, level: 2, killXp: '2d10', spawnHp: '1d5' },
    stats: { name: 'floating eye', race: 'Spore',
      behaviors: [Behaviors.ParalyzesWhenHit(50), Behaviors.Wanders()]
    } }) };

export const electricSphere = { difficulty: 8, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Elements.Shock },
    attributes: { ac: -6, speed: 110, level: 6, killXp: '15d10', spawnHp: '5d4' },
    stats: { name: 'shocking sphere', race: 'Spore',
      behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.EmitsLight(GlyphColors.Elements.Shock)],
      traits: [Traits.ShockResistance()],
      attacks: [Attacks.Explode({ roll: '4d6', element: 'Shock' })]
    } }) };

export const fireSphere = { difficulty: 8, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Elements.Fire },
    attributes: { ac: -6, speed: 110, level: 6, killXp: '15d10', spawnHp: '5d4' },
    stats: { name: 'burning sphere', race: 'Spore',
      behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.EmitsLight(GlyphColors.Elements.Fire)],
      traits: [Traits.FireResistance()],
      attacks: [Attacks.Explode({ roll: '4d6', element: 'Fire' })]
    } }) };

export const iceSphere = { difficulty: 8, spawnPattern: '1d1', frequency: 3, init: () =>
  ({ glyph: { key: Glyphs.Spore, fg: GlyphColors.Elements.Ice },
    attributes: { ac: -6, speed: 110, level: 6, killXp: '15d10', spawnHp: '5d4' },
    stats: { name: 'freezing sphere', race: 'Spore',
      behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.EmitsLight(GlyphColors.Elements.Ice)],
      traits: [Traits.IceResistance()],
      attacks: [Attacks.Explode({ roll: '4d6', element: 'Ice' })]
    } }) };