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

    if (warrior.feel().isUnit()) {
      const unit = warrior.feel().getUnit();
      if (unit.isFriendly() && unit.isBound())
        return warrior.rescue();
      return warrior.attack();
    }

    if (isHurt && !isTakingDamage)
      return warrior.rest();

    warrior.walk();
  }
}
