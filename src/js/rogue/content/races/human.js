
import Race from '../../definitions/race';

const opts = { stats: { str: 1, con: 1, dex: 1, int: 1, wis: 1, cha: 1, luk: 1, sight: -1 } };
export default class Human extends Race {
  constructor() {
    super(opts);
  }
}