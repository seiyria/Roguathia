
import loadValue from '../lib/value-assign';

let defaultCfg = {
  ac  : 0,
  hp  : 0,
  mp  : 0,
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
  titles: [],
  attacks: []
};

export default class Profession {
  constructor(config = {}) {
    config = _.clone(config); // to prevent overwriting stuff
    if(!config.addFactions) config.addFactions = [];
    config.addFactions.push(this.constructor.name);
    this.config = config;
    _.extend(this, defaultCfg, config, loadValue);
    this.level = 1;
    this.title = this.titles[0];
  }
  levelup() {
    this.level++;
    if(this.titles[this.level-1]) {
      this.title = this.titles[this.level-1];
    }
  }
}