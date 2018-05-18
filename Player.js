class Player {
  playTurn(warrior) {
    if (warrior.feel().isUnit()) {
      warrior.attack();
    } else {
      warrior.walk();
    }
  }
}
