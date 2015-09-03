
// thank you based stackexchange http://codereview.stackexchange.com/a/97310/64362
const INDICES = [1, 2, 3, 6, 9, 8, 7, 4];
const PROBABILITIES = [10000, 2000, 500, 50, 10, 50, 500, 2000];

export default (lastNumpadDirection) => {
  const lastIndexDirection = INDICES.indexOf(lastNumpadDirection);
  const shifted = PROBABILITIES.slice(PROBABILITIES.length - lastIndexDirection)
    .concat(PROBABILITIES.slice(0, PROBABILITIES.length - lastIndexDirection));
  const result = {};
  for(let i = 0, l = INDICES.length; i < l; i++) {
    result[INDICES[i]] = shifted[i];
  }
  return result;
};