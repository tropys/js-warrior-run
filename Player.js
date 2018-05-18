class Player {
  playTurn(warrior) {
    if (warrior.feel().isUnit())
      return warrior.attack();

    if (warrior.health() < 20)
      return warrior.rest();

    warrior.walk();
  }
}
