
export default (value, other) => {
  if(_.isString(other) && _.contains(other, 'd')) {
    return +dice.roll(other);
  }
  return other;
};