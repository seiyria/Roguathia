
//todo http://stackoverflow.com/questions/29722270/import-modules-from-files-in-directory

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
  titles : []
};

class Profession {
  constructor(config) {
    _.extend(this, defaultCfg, config);
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
  hp  : 5,
  str : 2,
  con : 2,
  int : -2,
  dex : 1,
  wis : -1,
  cha : 3,
  luk : 4,
  titles : ['Rambler',, 'Sightseer',,, 'Excursionist',,, 'Perigrinator',,, 'Traveler',,, 'Journeyer',,, 'Voyager',,, 'Explorer',,, 'Adventurer']
};

export class Tourist extends Profession {
  constructor() {
    super(touristCfg);
  }
}