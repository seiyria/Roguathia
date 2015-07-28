
//todo http://stackoverflow.com/questions/29722270/import-modules-from-files-in-directory
//todo maybe make professions have their own xp/levelup stuff? that way it's not always 1/1 thief, 2/2 mage, etc. -- classes could grow at their own rates then, making some inherently more difficult than others.

import loadValue from './lib/value-assign';

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

class Profession {
  constructor(config) {
    _.extend(this, defaultCfg, config, loadValue);
    this.level = 1;
    this.title = this.titles[0];
  }
  levelup() {
    this.level++;
    if(this.titles[this.level]) {
      this.title = this.titles[this.level];
    }
  }
}

let touristCfg = {
  hp  : '1d10 + 3',
  mp  : '1d2 + 1',
  str : '1d3',
  con : '1d3',
  int : '1d3 - 3',
  dex : '1d2',
  wis : '1d2 - 3',
  cha : '1d3 + 1',
  luk : '1d5',
  gold: '1d1000',
  titles : ['Rambler',, 'Sightseer',,, 'Excursionist',,, 'Perigrinator',,, 'Traveler',,, 'Journeyer',,, 'Voyager',,, 'Explorer',,, 'Adventurer']
};

export class Tourist extends Profession {
  constructor() {
    super(touristCfg);
  }
}

export class Monster extends Profession {}