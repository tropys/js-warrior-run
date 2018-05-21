
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

const recollectLastTurn = (memory) => memory[memory.length - 1];

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
    this.mode = FORWARD;
    this.memory = [{
      status: {
        turn: 0,
        health: initialHealth,
        isTakingDamage: false,
        isHurt: false
      }
    }];
  }

  status(warrior, lastTurn) {
    const {status: prevStatus} = lastTurn;
    const health = warrior.health();
    const isTakingDamage = health < prevStatus.health;
    const isHurt = warrior.health() < initialHealth;
    const turn = prevStatus.turn++;
    return {turn, health, isTakingDamage, isHurt};
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

    return {stairs, walls, enemys, friends}
  }

  planAndAct(warrior, status, sensed) {
    const {health, isHurt, isTakingDamage} = status;
    const {stairs, walls, enemys, friends} = sensed;

    warrior.think(`about turn ${status.turn}`)

    // enemys can block stairs so they sometimes have to be cleared before
    if (enemys.length > 0) {
      warrior.think('about attacking');
      return warrior.attack(enemys[0][0]);
    }

    if (stairs.length > 0) {
      warrior.think('about taking the stairs');
      return warrior.walk(stairs[0][0]);
    }

    if (friends.length > 0) {
      warrior.think('about rescuing a friend');
      return warrior.rescue(friends[0][0]);
    }

    if (isHurt && !isTakingDamage) {
      warrior.think('about resting');
      return warrior.rest();
    }
    // back off one step
    if (isTakingDamage && health <= 10) {
      warrior.think(`turning away from ${this.mode}`);
      return warrior.walk(oppositeDirection(this.mode));
    }
    if (wallInDirection(walls, this.mode)) {
      warrior.think(`turning away from ${this.mode}`);
      return warrior.pivot(oppositeDirection(this.mode));
    }

    warrior.think(`walking ${this.mode}`);
    return warrior.walk(this.mode);
  }

  playTurn(warrior) {
    const lastTurn = recollectLastTurn(this.memory);
    const sensed = this.sense(warrior);
    const status = this.status(warrior, lastTurn);
    this.planAndAct(warrior, status, sensed);

    this.memory.push({status, sensed});
  }
}
