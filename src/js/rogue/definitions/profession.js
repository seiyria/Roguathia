
import _ from 'lodash';
import loadValue from '../lib/value-assign';
import Settings from '../constants/settings';

export default class Profession {
  constructor(config = {}) {
    config = _.extend({}, Settings.game.defaultStats.profession, config);
    this.config = config;
    _.extend(this, config, loadValue);
    config.addFactions.push(this.constructor.name);
    this.level = 1;
    this.title = this.titles[0];
  }
  levelup() {
    this.level++;
    if(this.titles[this.level-1]) {
      this.title = this.titles[this.level-1];
    }
    _(this.config)
      .keys()
      .reject(key => _.isObject(this.config[key]))
      .value()
      .forEach(key => {
        const val = loadValue(null, this.config[key]);
        this[key] += val;
      });
  }
}