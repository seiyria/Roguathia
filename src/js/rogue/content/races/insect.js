
import Race from '../../definitions/race';

const opts = { stats: { dex: -2, str: -2, con: -2 } };
export default class Insect extends Race {
  constructor() {
    super(opts);
  }
}