
import Humanoid from './_humanoid';

const opts = { slots: { hands: 3 }, stats: { dex: 2 } };
export default class Lizard extends Humanoid {
  constructor() {
    super(opts);
  }
}