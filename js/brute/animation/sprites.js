//Season enums can be grouped as static members of a class
function MinotaureSprites() {
  // Create new instances of the same class as static attributes
  this.Attack = new Sprite("../image/brute/brutes/minotaure/minotaure-attack-", 12, 0.25, 0.4);
  this.Idle = new Sprite("../image/brute/brutes/minotaure/minotaure-idle-", 12, 0.25, 0.4);
  this.Walk = new Sprite("../image/brute/brutes/minotaure/minotaure-walking-", 18, 0.25, 0.4);

}