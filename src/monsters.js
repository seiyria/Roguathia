
import * as Behaviors from "./behaviors";
import Attacks from "./attacks";

export var gridBug =          { difficulty: 1, glyph: {key: 'x', fg: 'purple'}, spawnPattern: '1d2',
                                  attributes: {ac: -1, speed: 150, level: 1, str: 5, dex: 3, con: 0, killXp: '4d1', spawnHp: '1d4 + 2'}, 
                                  stats: {name: 'grid bug',
                                    behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks()], 
                                    attacks: [Attacks.ElectricTouch('1d3 + 1')] 
                                  }};
export var newt =             { difficulty: 1, glyph: {key: ':', fg: 'yellow'}, spawnPattern: '1d1',
                                  attributes: {ac: -2, speed: 50, level: 1, str: 2, dex: 1, con: 1, killXp: '1d1', spawnHp: '1d4'}, 
                                  stats: {name: 'newt',  
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d3 + 1')]
                                  }};
export var gasSpore =         { difficulty: 2, glyph: {key: 'e', fg: 'gray'}, spawnPattern: '1d1',
                                  attributes: {ac: 0, speed: 25, level: 2, str: 0, dex: 0, con: 0, killXp: '12d1', spawnHp: '2d4'}, 
                                  stats: {name: 'gas spore',
                                    behaviors: [Behaviors.Explodes('4d8'), Behaviors.Wanders()]
                                  }};
export var jackal =           { difficulty: 2, glyph: {key: 'd', fg: 'brown'}, spawnPattern: '1d3 + 1',
                                  attributes: {ac: -3, speed: 125, level: 1, str: '1d4 + 4', dex: '2d3 + 4', con: 4, killXp: '2d3 + 3', spawnHp: '1d5 + 5', gold: '1d10'}, 
                                  stats: {name: 'jackal', 
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.Bloodthirsty(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d2 + 2', '1d1')] 
                                  }};