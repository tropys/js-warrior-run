
// run all Senses each turn
// remember all turns

// scoring heuristic?

class Player {
  constructor() {
    this.health = undefined;
  }

  status(warrior) {
    const currentHealth = warrior.health();
    const isTakingDamage = currentHealth < this.health;
    const isHurt = warrior.health() < 20;
    return {currentHealth, isTakingDamage, isHurt};
  }

  playTurn(warrior) {
    if (!this.health)
      this.health = warrior.health();
    const {currentHealth, isHurt, isTakingDamage} = this.status(warrior);
    this.health = currentHealth;

    //-----------

    if (warrior.feel().isStairs()) {
        return warrior.walk();
    }

    if (warrior.feel().isUnit()) {
      const unit = warrior.feel().getUnit();
      if (unit.isFriendly() && unit.isBound())
        return warrior.rescue();
      return warrior.attack();
    }

    if (isHurt && !isTakingDamage)
      return warrior.rest();

    if (isTakingDamage && this.health <= 10)
      return warrior.walk('backward');

    warrior.walk();
  }
}
