
import * as Behaviors from "./behaviors";
import Attacks from "./attacks";

export var gridBug =          { difficulty: 1, glyph: {key: 'x', fg: 'purple'}, spawnPattern: '1d2', frequency: 100,
                                  attributes: {ac: -1, speed: 150, level: 1, str: 5, dex: 3, con: 0, killXp: '4d1', spawnHp: '1d4 + 2'}, 
                                  stats: {name: 'grid bug', race: 'Insect',
                                    behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks()], 
                                    attacks: [Attacks.ElectricTouch('1d3 + 1')] 
                                  }};
export var newt =             { difficulty: 1, glyph: {key: ':', fg: 'yellow'}, spawnPattern: '1d1', frequency: 100, 
                                  attributes: {ac: -2, speed: 50, level: 1, str: 2, dex: 1, con: 1, killXp: '1d1', spawnHp: '1d4'}, 
                                  stats: {name: 'newt', race: 'Salamander',
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d3 + 1')]
                                  }};
export var gasSpore =         { difficulty: 2, glyph: {key: 'e', fg: 'gray'}, spawnPattern: '1d1',  frequency: 50,
                                  attributes: {ac: 0, speed: 25, level: 2, str: 0, dex: 0, con: 0, killXp: '12d1', spawnHp: '2d4'}, 
                                  stats: {name: 'gas spore', race: 'Spore',
                                    behaviors: [Behaviors.Explodes('4d8'), Behaviors.Wanders()]
                                  }};
export var jackal =           { difficulty: 2, glyph: {key: 'd', fg: 'brown'}, spawnPattern: '1d3 + 1',  frequency: 75,
                                  attributes: {ac: -3, speed: 125, level: 1, str: '1d4 + 2', dex: '2d3 + 4', con: 4, killXp: '2d3 + 3', spawnHp: '3d3 + 5'}, 
                                  stats: {name: 'jackal', race: 'Canine',
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('1d10'), Behaviors.Bloodthirsty(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d2 + 1', '1d2')] 
                                  }};
export var giantAnt =         { difficulty: 4, glyph: {key: 'a', fg: 'brown'}, spawnPattern: '1d4 + 2',  frequency: 20,
                                  attributes: {ac: -2, speed: 150, level: 3, str: '1d3 + 3', dex: '1d3 + 2', con: 4, killXp: '2d4 + 5', spawnHp: '1d8 + 5'}, 
                                  stats: {name: 'giant ant', race: 'Insect',
                                    behaviors: [Behaviors.LeavesCorpse(), Behaviors.DropsGold('2d4'), Behaviors.Bloodthirsty(), Behaviors.Attacks()], 
                                    attacks: [Attacks.Bite('1d4 + 1')] 
                                  }};