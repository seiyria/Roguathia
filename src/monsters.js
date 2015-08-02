
import * as Behaviors from "./behaviors";
import * as Attacks from "./attacks";

export var gridBug =          { difficulty: 1, glyph: {key: 'x', fg: 'purple'}, spawnPattern: '1d2',
                                  attributes: {ac: -1, speed: 150, level: 1, killXp: '4d1', spawnHp: '1d4 + 1'}, 
                                  stats: {name: 'grid bug',
                                    behaviors: [Behaviors.SeeksPlayer(), Behaviors.Attacks()], 
                                    attacks: [Attacks.ElectricTouch('1d2')] 
                                  }};
export var newt =             { difficulty: 1, glyph: {key: ':', fg: 'yellow'}, spawnPattern: '1d1',
                                  attributes: {ac: -2, speed: 50, level: 1, killXp: '1d1', spawnHp: '1d4'}, 
                                  stats: {name: 'newt',  
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksPlayer(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d2')]
                                  }};
export var gasSpore =         { difficulty: 2, glyph: {key: 'e', fg: 'gray'}, spawnPattern: '1d1',
                                  attributes: {ac: 0, speed: 25, level: 2, killXp: '12d1', spawnHp: '2d4'}, 
                                  stats: {name: 'gas spore',
                                    behaviors: [Behaviors.Explodes('4d8'), Behaviors.Wanders()]
                                  }};
export var jackal =           { difficulty: 2, glyph: {key: 'd', fg: 'brown'}, spawnPattern: '1d3 + 1',
                                  attributes: {ac: -3, speed: 125, level: 1, killXp: '1d3 + 3', spawnHp: '1d10 + 5', gold: '1d10', str: '1d3', dex: '1d3'}, 
                                  stats: {name: 'jackal', 
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksPlayer(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d2')] 
                                  }};