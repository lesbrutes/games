$(document).ready(function () {
	
	var brute = new Brute(Direction.Right);
	var battle = new Battle(brute);
	window.battle = battle;

	$('#battleBtn').bind('click', {battle:battle}, battle.newBattle);
	$('#attackBtn').bind('click', {battle:battle}, battle.attack);

});

function Battle(brute) {
	var battle = this;

	this.player = brute;
	this.enemy = new Brute(Direction.Left);
    
    this.newBattle = function() {
    	//todo reset
    }
    
    this.attack = function() {
    	console.log("Attacking");
    	battle.player.attack();
    }
    
}


//Season enums can be grouped as static members of a class
class Direction {
  // Create new instances of the same class as static attributes
  static Left = new Direction("LEFT")
  static Right = new Direction("RIGHT")

  constructor(name) {
    this.name = name
  }
}