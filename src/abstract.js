
export default class Abstract {
  distBetween(target) {
    let a = target.x - this.x;
    let b = target.y - this.y;
    return Math.sqrt(a*a + b*b);
  }
}