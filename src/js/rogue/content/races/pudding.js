
import Race from '../../definitions/race';

const opts = { stats: { con: 5, int: -5, wis: -5, dex: -5, str: -1, sight: -1 } };
export default class Pudding extends Race {
  constructor() {
    super(opts);
  }
}