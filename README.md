# Roguathia [![Code Climate](https://codeclimate.com/github/seiyria/Roguathia/badges/gpa.svg)](https://codeclimate.com/github/seiyria/Roguathia) [![Dependency Status](https://gemnasium.com/seiyria/Roguathia.svg)](https://gemnasium.com/seiyria/Roguathia) [![bitHound Score](https://www.bithound.io/github/seiyria/Roguathia/badges/score.svg)](https://www.bithound.io/github/seiyria/Roguathia) [![Build Status](https://travis-ci.org/seiyria/Roguathia.svg)](https://travis-ci.org/seiyria/Roguathia) [![Codacy Badge](https://www.codacy.com/project/badge/7d38b1b793bb4cec862debe3af85f851)](https://www.codacy.com/app/seiyria/Roguathia)

# TODO
* Sometimes people come back to life but are actually dead
* Fix multi-person dead rendering
* AI retarget in sight if there is another player that's not the target
* Add more players. Allow for main game to focus on party leader, or splitscreen like the other views. Allow for "vertical" or "horizontal" splitscreen - when you have 2 or more people adjust the screen accordingly.
  * Allow people to choose whether they want their party to follow (ie, one goes down, they all go down) or be separate.
* Magic Mapping trait (call it something different, like dungeon arcana?)
* Ending conditions (worth different amounts of VP)
  * Kill Selyk
  * Find the ring of Selyk (opens a chamber leading to an altar)
  * Find the stone of Selyk (insta-win, low VP gain)
  * Last a certain number of turns
  * Possibly other endings depending on dungeon path (or maybe all ends lead to Selyk), or other paths have different artifacts you can collect/use that are worth different amounts of VP
* Content (all types of items)
* Meta-currency (and benefits)
  * SP (every turn taken = 1 step)
    * More character classes
    * Permanent character benefits (+1 str, etc)
    * More party members
    * More behavior types
    * More races
    * Assignable behaviors
    * Assignable classes
    * More starting equipment (unlock certain starting equipment tiers)
    * Better starting equipment (enchanted, more charges, etc)
    * More item variety (ie, unlock the 25%, 50%, 75% and 100% percentile of rarity in items)
    * Temporary enchantments, blessings, uncursings, etc (spent in the meta, apply to current game only)
    * Better tombstones (per character)
    * Pet slot
    * Pet (based on chooseable monsters)
    * Better starting proficiencies
    * Template slots (assignable to a character, but kept separate, these would allow you to store a configuration)
    * More color choices for players to be
    * More border style choices (style = character[s] + color)
  * KP (monsters are worth different amounts of points)
    * More monster variety
    * Stronger monsters (ie, their stats are overall better)
    * Expand item drop variety (ie, their starting equipment is better)
    * Tameable monster variety
    * More pet choices
  * VP (you get points for surviving the dungeon, your conduct is worth lots of points)
    * More dungeon features (fountains, thrones, decorations, sinks, etc)
    * Deeper dungeons (+2 floors / lvl)
    * More floor types (caves, mines, towns, etc) (see [here](http://crawl.chaosforge.org/Dungeon_branches) for possible branch types)
    * More chance of generating items on the floor (say, 1% chance per floor, increasing by 1% each time)
    * More items generated on the floor (say, increase the max by 1 per level - the min would always be 1)
    * Better items generated on the floor
    * Possibly unlock a dungeon editor (you can rearrange what floors are in what order, and how many of them spawn)
    * Better respawn time
* Refactor stair placement to Generator

# Website
* Ascii-styled theme for bootstrap [this maybe](https://kristopolous.github.io/BOOTSTRA.386/)

# Pre-release
* Analysis tool to make sure stats/etc are declared properly (they may need to be moved to the prototype so they can be imported)
* Assertions, unit tests, logging, general code refactoring / cleanup
* IRC bot (Selyk) to announce major events (deaths, etc) / scrollback to chat
* Track statistics (games played, monsters killed, killed by, total SP/KP/VP, features interacted with [doors opened, etc])
* Refactor / reorg / unit tests for classes, remove magic numbers

# Post-release
* Doors that require keys that are spawned in the level, and have treasure or stairs behind them
* More content
* More puzzles
* More intricate death messages ("while asleep" "while stunned")
* Catchable ammo, recoverable ammo
* Gems: random category, unidentifieable until the end of the game
* Scrolls: only usable by players? (ie, not the characters in the dungeon)
* Drop items on dungeon floor occasionally during generation
* Traps in the dungeon (also implement levitation)
* Deities
* Conflict trait