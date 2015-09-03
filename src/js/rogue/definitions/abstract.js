
export default class Abstract {
  distBetween(target) {
    const a = target.x - this.x;
    const b = target.y - this.y;
    return Math.sqrt(a*a + b*b);
  }

  distBetweenXY(x, y) {
    return this.distBetween({ x, y });
  }

  getCanonName() {
    return _.startCase(this.constructor.name).toLowerCase();
  }

  getType() {
    return this.constructor.name.toLowerCase();
  }

  getParentType() {
    return Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.toLowerCase();
  }
}