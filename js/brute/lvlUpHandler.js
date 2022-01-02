class LvlUpHandler {
	constructor() {
  	}
  
	lvlUp(player) {
		var randomInt = randomIntFromInterval(0,3);
		
		if (randomInt == 0) {
			player.hp += 1;
		} else if(randomInt == 1) {
			player.strenght += 1;
		} else if (randomInt == 2) {
			player.speed += 1;
		} else if (randomInt == 3) {
			player.agility += 1;
		}
		
		this.notifyLvlUp(player);
	}
	
	notifyLvlUp(player) {
        console.log("Notifying lvl up");
        var event = new CustomEvent("lvlUp", { "detail": player });
        document.dispatchEvent(event);
    };
	
	

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}