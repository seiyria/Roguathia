
import _ from 'lodash';
import ROT from 'rot-js';

export const WeightedExtension = (hash, filterKey = 'probability', predicate = () => true) => {

  const valid = _(hash).keys().filter(predicate).reduce((prev, key) => {

    // handle pre-formatted probability hashes
    if(_.isNumber(hash[key])) {
      prev[key] = hash[key];
    } else {
      prev[key] = hash[key][filterKey];
    }
    return prev;
  }, {});

  const choice = ROT.RNG.getWeightedValue(valid);
  return { key: choice, value: hash[choice] };
};