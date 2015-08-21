
export default class NumberRange {
  constructor(min, cur, max) {
    this.min = min;
    this.max = max;
    this._set(cur);
  }
  
  atMin() { return this.cur === this.min; }
  atMax() { return this.cur === this.max; }
  
  percent()       { return ~~((this.cur / this.max)*100); }
  gtPercent(pct)  { return this.percent() > pct; }
  ltPercent(pct)  { return this.percent() < pct; }
  ePercent(pct)   { return this.percent() === pct; }
  gtePercent(pct) { return this.percent() >= pct; }
  ltePercent(pct) { return this.percent() <= pct; }
  
  _set(num) { this.cur = Math.max(this.min, Math.min(this.max, num)); }
  add(num) { this._set(num + this.cur); }
  sub(num) { this.add(-num); }
}