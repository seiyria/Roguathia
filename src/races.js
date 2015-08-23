
let defaultSlots = { 
  hands:  2, 
  head:   1,
  body:   1, 
  feet:   2, 
  wrist:  2, 
  cloak:  1, 
  neck:   1, 
  ring:   2 
};

class Race {
  constructor(opts = {}) {
    this.slots = _.extend({}, defaultSlots, opts.slots);
    this.addFactions = [this.constructor.name];
  }
  canEquip(item) {
    
  }
}

export class Human extends Race {
}

export class Orc extends Race {
  
}

export class Gnome extends Race {
  
}

export class Elf extends Race {
  
}

let lizardOpts = {slots: {hands: 3}};
export class Lizard extends Race {
  constructor() {
    super(lizardOpts);
  }
}

export class Psionic extends Race {
  canEquip(item) {
    return item.type !== 'weapon';
  }
}

let manticoreOpts = {slots: {hands: 0, body: 3, feet: 0, heads: 3, neck: 3, ring: 0, cloak: 0, wrist: 0}};
export class Manticore extends Race {
  constructor() {
    super(manticoreOpts);
  }
}

let snakeOpts = {slots: {hands: 0, body: 1, feet: 0, heads: 1, neck: 1, ring: 1, cloak: 0, wrist: 0}};
export class Snake extends Race {
  
}

let spiderOpts = {slots: {hands: 0, body: 1, feet: 8, heads: 1, neck: 1, ring: 0, cloak: 0, wrist: 0}};
export class Spider extends Race {
  
}

export class Canine extends Race {}
export class Spore extends Race {}
export class Salamander extends Race {}
export class Insect extends Race {}