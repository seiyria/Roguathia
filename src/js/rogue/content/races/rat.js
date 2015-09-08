
import Race from '../../definitions/race';

const opts = { stats: { con: -3, int: -3, wis: -3, dex: -3, str: -3, cha: -3, luk: -3, sight: -1 } };
export default class Rat extends Race {
  constructor() {
    super(opts);
  }
}