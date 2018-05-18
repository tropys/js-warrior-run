## Umetron - beginner - level 6

### _The wall behind you feels a bit further away in this room. And you hear more cries for help._

> **TIP:** You can walk backward by passing `'backward'` as an argument to `walk()`. Same goes for `feel()`, `rescue()` and `attack()`. Archers have a limited attack distance.

> **CLUE:** Walk backward if you're taking damage from afar and don't have enough health to attack. You may also want to consider walking backward until you hit a wall. Use `warrior.feel().isWall()` to see if there's a wall.

### Floor Map

```
╔════════╗
║C @ S aa║
╚════════╝

C = Captive (1 HP)
@ = Umetron (20 HP)
S = Thick Sludge (24 HP)
a = Archer (7 HP)
```

### Abilities

#### Actions (only one per turn)

* `warrior.walk()`: Move one space in the given direction (forward by default).
* `warrior.attack()`: Attack a unit in the given direction (forward by default) dealing 5 HP of damage.
* `warrior.rest()`: Gain 10% of max health back, but do nothing more.
* `warrior.rescue()`: Release a unit from his chains in the given direction (forward by default).

#### Senses

* `warrior.think()`: Think about your options before choosing an action.
* `warrior.feel()`: Return the adjacent space in the given direction (forward by default).
* `warrior.health()`: Return an integer representing your health.

### Next Steps

When you're done editing `Player.js`, run the `warriorjs` command again.
