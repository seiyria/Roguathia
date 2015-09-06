
import _ from 'lodash';
import loadValue from '../lib/value-assign';

const defaultCfg = {
  hp  : '0d0',
  mp  : '0d0',
  ac  : 0,
  str : 0,
  con : 0,
  int : 0,
  dex : 0,
  wis : 0,
  cha : 0,
  luk : 0,
  speed: 0,
  sight: 0,
  spawnSteps: 0,
  addFactions: [],
  addBehaviors: [],
  titles: [],
  attacks: [],
  traits: [],
  skillCaps: {}
};

export default class Profession {
  constructor(config = {}) {
    config = _.clone(_.extend({}, defaultCfg, config)); // to prevent overwriting stuff
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