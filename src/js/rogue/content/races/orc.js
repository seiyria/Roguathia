
import Race from '../../definitions/race';

const opts = { stats: { dex: -1, str: 3, con: 3, int: -3, wis: -2, sight: 1 } };
export default class Orc extends Race {
  constructor() {
    super(opts);
  }
}