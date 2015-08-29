
import Race from '../../definitions/race';

const opts = { slots: { hands: 3 }, stats: { dex: 2 } };
export default class Lizard extends Race {
  constructor() {
    super(opts);
  }
}