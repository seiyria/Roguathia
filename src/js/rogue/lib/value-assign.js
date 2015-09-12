
import _ from 'lodash';
import Roll from './dice-roller';

export default (value, other) => {
  if(_.isString(other) && _.contains(other, 'd')) {
    return Roll(other);
  }
  return other;
};