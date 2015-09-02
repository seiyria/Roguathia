
export default class Trait {
  constructor(opts) {
    _.extend(this, { level: 1, req: 0 }, opts);
  }

  canUse(entity) {
    return entity.level >= this.req;
  }
}