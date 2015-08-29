
import Race from '../../definitions/race';

const opts = { stats: { dex: 2, str: 2, con: 1, int: -1, wis: -1 } };
export default class Canine extends Race {
  constructor() {
    super(opts);
  }
}