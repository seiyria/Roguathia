
export default class NumberRange {
  constructor(min, cur, max) {
    this.min = min;
    this.max = max;
    this._set(cur);
  }
  
  atMin() { return this.cur === this.min; }
  atMax() { return this.cur === this.max; }
  
  _set(num) { this.cur = Math.max(this.min, Math.min(this.max, num)); }
  add(num) { this._set(num + this.cur); }
  sub(num) { this.add(-num); }
}