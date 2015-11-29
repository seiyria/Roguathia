# Roguathia [![bitHound Dependencies](https://www.bithound.io/github/seiyria/Roguathia/badges/dependencies.svg)](https://www.bithound.io/github/seiyria/Roguathia/master/dependencies/npm) [![bitHound Score](https://www.bithound.io/github/seiyria/Roguathia/badges/score.svg)](https://www.bithound.io/github/seiyria/Roguathia) [![Build Status](https://travis-ci.org/seiyria/Roguathia.svg)](https://travis-ci.org/seiyria/Roguathia) [![Codacy Badge](https://www.codacy.com/project/badge/7d38b1b793bb4cec862debe3af85f851)](https://www.codacy.com/app/seiyria/Roguathia)

# Notes
If the game whitescreens for you (in Chrome), please disable hardware acceleration.

# TODO
* Meta-currency (and benefits)
  * SP (every turn taken = 1 step)
    * Assignable behaviors & more behavior types
    * More starting equipment (unlock certain starting equipment tiers)
    * Temporary enchantments, blessings, uncursings, etc (spent in the meta, apply to current game only)
    * Better tombstones (per character)
    * More border style choices (style = character[s] + color)
    * Higher SP multiplier
    * Game speed slider
  * KP (monsters are worth different amounts of points)
    * More monster variety (ie, unlock certain difficulties for monsters. By default you only get up to difficulty 5 or so.)
    * Stronger monsters (ie, their stats are overall better)
    * Expand item drop variety (ie, their starting equipment is better)
    * Higher KP multiplier
  * VP (you get points for surviving the dungeon, your conduct is worth lots of points)
    * More dungeon features (fountains, thrones, decorations, sinks, torches, etc)
    * Deeper dungeons (+5 floors / lvl)
    * More floor types (caves, mines, towns, etc) (see [here](http://crawl.chaosforge.org/Dungeon_branches) for possible branch types)
    * More chance of generating items on the floor (try to generate 1%, one tile, then try to generate another 1% for another item (keep going until max is reached, or failure occurs))
    * More items generated on the floor (say, increase the max by 1 per level - the min would always be 1)
    * Better items generated on the floor
    * Possibly unlock a dungeon editor (you can rearrange what floors are in what order, and how many of them spawn)
    * Better respawn time
    * Guaranteed N artifact generations
    * Higher VP multiplier
* Achievements (worth VP, some worth recurring VP to a lesser extent)
  * Beat game with one party member @ level X (10, 25, 50, 100)
  * Beat game with one party member where dungeon size >= X (10, 25, 50, 100)
  * Unlock all Y (Y = party member slots, behaviors, traits, classes, races, colors, pets, dungeon floor types, dungeon features)
  * Get a dungeon of size X (10, 20, 30, 40, 50...)
  * Customize a player (template slot | color | pet | tombstone)
  * Deck out a player (template slot, color, pet, tombstone)
  * Get an item enchanted to +5, +7, +9

# Pre-release
* Analysis tool to make sure stats/etc are declared properly (they may need to be moved to the prototype so they can be imported)
* Assertions, unit tests, logging, general code refactoring / cleanup
* IRC bot (Selyk) to announce major events (deaths, etc)
* Track statistics (games played, monsters killed, killed by, total SP/KP/VP, features interacted with [doors opened, etc])
* Refactor / reorg / unit tests for classes
* Conventional changelog for bump/release
* Import/export savefile and reset game
* More messages! Make sure the messages line up with with the game better, ie, show:
  * descend
  * game over
  * other special events (sitting on a throne, interacting with a fountain, etc)

# Idea Bucket (TBD)
* Gravestones should use deaths from other players to spawn occasionally. also, they should get a death message. maybe also store deaths in the firebase
* Chests and other containers
* More intricate death messages ("while asleep" "while stunned")
* Catchable ammo, recoverable ammo
* Gems: random category, unidentifiable until the end of the game
* Scrolls: only usable by players? (ie, not the characters in the dungeon)
* Traps in the dungeon (also implement levitation)
* Deities (also, add altars as dungeon features and temples as possible rooms)
* Conflict trait
* More floor types such as [this](http://www.gamasutra.com/blogs/AAdonaac/20150903/252889/Procedural_Dungeon_Generation_Algorithm.php)
* More victory types leading through various dungeons (similar to SelykAltar, generate a few extra floors at the bottom)
* Possibly allow people to use a slider to determine the relative generatability of room types
* Allow fountains to also spurt out pools onto the floor
* Themed rooms (Oracle room, Throne room, Bathroom, Graveyard)
  * More [here](https://nethackwiki.com/wiki/Special_room)
* Artifact Weapons
* Reflection (and an amulet, cloak)
* Magic resistance (for some monsters, and a cloak)
* Forgetful trait - you can only know what you see, the rest you forget (ie, explored hash is useless)
* Use known healing potions or use random potions when dying (also, allow people to manually use potions)
* heavy weapons (maces, greatmaces) that have knockback on their attacks (or bonus damage if the target is against a wall)
* Random colored stars on the respawn screen
* Random dungeon afflictions/bonuses (+120% SP gain, -3 con, etc)
* Pick better spells randomly
  * Potions as well (possibly, players interact with these things)
  * don't always pick healing potions -- random potions if healing is not identified -- maybe some kind of weighting for situations to try new things? "danger sense"?
  * implement more spellbooks and wands that incorporate buffs (possibly if you're not in combat, attempt to buff yourself, based on the buffs you have)
* Polymorph self
  * Chameleons can do this
* Corrision
  * -1 enchantLevel hit with a corrosionPercent chance of happening, adds "corroded" to name if < 0
  * add CorrodesWhenHit and a corrosion attribute to the attack that both do the same thing. Or maybe a CorrodeOnHit behavior?
  * Black Pudding
  * only affects corrodable items
* Burning
  * on a burn attack, everything has a chance of burning (if burnable), or explode (if explodable)
* More dungeon types
  * Mines
  * Town (arena with shops in it, or a digger with empty spaces/corridor spaces replaced with basic tile)
  * Big Room
  * Fortress
  * Swamp
  * Flooded
  * Castle
  * Lava floes
* figure out instance decorators for materials, glyphs, slotsTaken, etc