
// run all Senses each turn
// remember all turns

// scoring heuristic?

const BACKWARD = 'backward';
const FORWARD = 'forward';
const LEFT = 'left';
const RIGHT = 'right'
const directions = [FORWARD, BACKWARD, LEFT, RIGHT];
const initialHealth = 20;

const wallInDirection = (walls, dirToCheck) => walls.some(([dir, space]) => dir === dirToCheck);

const oppositeDirection = direction => {
  switch(direction) {
    case FORWARD:
      return BACKWARD;
    case BACKWARD:
      return FORWARD;
    case LEFT:
      return RIGHT;
    case RIGHT:
      return LEFT;
    default:
      return FORWARD;
  }
}

class Player {
  constructor() {
    this.health = initialHealth;
    this.mode = BACKWARD;
  }

  status(warrior) {
    const currentHealth = warrior.health();
    const isTakingDamage = currentHealth < this.health;
    const isHurt = warrior.health() < initialHealth;
    return {currentHealth, isTakingDamage, isHurt};
  }

  sense(warrior) {
    const spaces = directions.map(dir => [dir, warrior.feel(dir)]);

    const stairs = spaces.filter(([dir, space]) => space.isStairs());
    const walls = spaces.filter(([dir, space]) => space.isWall());

    const units = spaces
      .filter(([dir, space]) => space.isUnit())
      .map(([dir, space]) => [dir, space.getUnit()]);
    const enemys = units.filter(([dir, unit]) => unit.isHostile());
    const friends = units.filter(([dir, unit]) => unit.isFriendly());

    return {
      stairs,
      walls,
      enemys,
      friends
    }
  }

  playTurn(warrior) {
    const {currentHealth, isHurt, isTakingDamage} = this.status(warrior);
    this.health = currentHealth;

    const {stairs, walls, enemys, friends} = this.sense(warrior);

    if (enemys.length > 0) {
      // enemys can block stairs so they sometimes have to be cleared before
      return warrior.attack(enemys[0][0]);
    }

    if (stairs.length > 0) {
      return warrior.walk(stairs[0][0]);
    }

    if (friends.length > 0) {
      return warrior.rescue(friends[0][0]);
    }

    if (isHurt && !isTakingDamage)
      return warrior.rest();

    if (isTakingDamage && this.health <= 10)
      // back off one step
      return warrior.walk(oppositeDirection(this.mode));

    if (wallInDirection(walls, this.mode)) {
      this.mode = oppositeDirection(this.mode);
    }

    return warrior.walk(this.mode);
  }
}
