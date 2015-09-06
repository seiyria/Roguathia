
import _ from 'lodash';
import dice from 'dice.js';

export default (value, other) => {
  if(_.isString(other) && _.contains(other, 'd')) {
    return +dice.roll(other);
  }
  return other;
};