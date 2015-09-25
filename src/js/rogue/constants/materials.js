
import _ from 'lodash';

const materials = {
  Unknown: 0,
  Cloth: 1,     // can burn, rot
  Leather: 2,   // can burn, rot
  Iron: 3,      // can rust, corrode
  Mithril: 4,
  Copper: 5,    // can corrode
  Glass: 6,     // can burn (melt), explode (if potion), shatter
  Dragon: 7,
  Wood: 8,      // can burn, rot,
  Food: 9,
  Silver: 10,
  Gold: 11
};

export default materials;

export const AffectedByFire   = (item) => _.contains([materials.Cloth, materials.Leather, materials.Glass, materials.Wood], item.material);
export const AffectedByAcid   = (item) => _.contains([materials.Iron, materials.Copper], item.material);
export const AffectedByPoison = (item) => _.contains([materials.Wood, materials.Cloth, materials.Leather], item.material);
export const AffectedByIce    = (item) => _.contains([materials.Glass], item.material);
