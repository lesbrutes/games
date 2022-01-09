class LvlUpHandler {
	constructor() {
  	}
  
	lvlUp(player) {
		player.lvl += 1;
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
		
		if (player.lvl % 2 == 0) {
			player.hp += 1;
		}
		
		this.giveWeaponIfPossible(player);

		this.notifyLvlUp(player);
	}
	
	notifyLvlUp(player) {
        console.log("Notifying lvl up");
        var event = new CustomEvent("lvlUp", { "detail": player });
        document.dispatchEvent(event);
    };
    
    giveWeaponIfPossible(player) {
		if (player.lvl == 5) {
			this.giveRandomWeapon(player, weapons.getTier1Weapons());
		} else if (player.lvl == 10) {
			this.giveRandomWeapon(player, weapons.getTier2Weapons());
		} else if (player.lvl % 15 == 0) {
			this.giveRandomWeapon(player, weapons.getAllWeapons());
		}
	
	}
	
	giveRandomWeapon(player, weaponArray) {
		debugger;
		weaponArray = weaponArray.filter(weapon => !player.weapons.includes(weapon));
		if (weaponArray.length > 0) {
			var randomIndex = randomIntFromInterval(0, weaponArray.length-1);
			var newWeapon = weaponArray[randomIndex];
			console.log("Adding weapon to player");
			console.log(newWeapon);
			console.log("Before adding");
			console.log(player.weapons);
			//player.weapons = player.weapons.push[weaponArray[randomIndex]];
			player.weapons.push(newWeapon)
			console.log("After adding");
			console.log(player.weapons);
		}
	}

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}