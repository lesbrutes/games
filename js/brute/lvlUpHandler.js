class LvlUpHandler {
	constructor() {
		this.choiceList = ["hp", "strength", "speed", "agility"];
		this.availableChoices = ["hp", "strength", "speed", "agility"];
		this.selectedChoice = null;
		this.choices = [];
		this.player = null;
  	}
  
	lvlUp(player) {
		this.selectedChoice = null;
		this.choices = [];
		this.availableChoices = this.choiceList;
		this.player = player; 
		
		player.lvl += 1;

		this._setChoices();
		this._giveExtraHpOnSpecificLvl(player);
		this._giveWeaponIfPossible(player);

		if (player == player1) {
			$("#lvlUpModal").modal('show');
		} else {
			this.selectedChoice = this._getRandomChoice();
			this.pickChoice();
		}
	}
	
	pickChoice() {
		if (this.selectedChoice != null) {
			if (this.selectedChoice  == "hp") {
				this.player.hp += 1;
			} else if(this.selectedChoice  == "strength") {
				this.player.strength += 1;
			} else if (this.selectedChoice  == "speed") {
				this.player.speed += 1;
			} else if (this.selectedChoice  == "agility") {
				this.player.agility += 1;
			}
			this._removeCurrentSelectedBorder();
			$("#lvlUpModal").modal('hide');
			displayStats();
		}
	}
	
	onSelect(choiceIndex, choiceDiv) {
		this.selectedChoice = this.choices[choiceIndex];
		this._removeCurrentSelectedBorder();
		$(choiceDiv).addClass("border");
	}
	
	_removeCurrentSelectedBorder() {
		var choices = $('.statChoice');
		choices.removeClass("border");
	}
	
	_setChoices() {
		this._setChoice(this._getRandomChoice(), 2);
		this._setChoice(this._getRandomChoice(), 3);
	}
	
	_setChoice(choice, index) {
		this.choices.push(choice);
		var stat = $("#lvlUpStat" + index);
		stat.attr('src', "../image/brute/stats/"+choice+".png");
	}
	
	_getRandomChoice() {
		var choice = this.availableChoices[randomIntFromInterval(0,this.availableChoices.length-1)];
		this.availableChoices = this.availableChoices.filter(item => item != choice)
		return choice;
	}
    
    _giveExtraHpOnSpecificLvl(player) {
		if (player.lvl % 2 == 0) {
			player.hp += 1;
			$("#lvlUpStat1Container").show();
		} else {
			$("#lvlUpStat1Container").hide();
		}
	}
    
    _giveWeaponIfPossible(player) {
		$("#lvlUpWeaponContainer").hide();
		if (player.lvl == 5) {
			this._giveRandomWeapon(player, weapons.getTier1Weapons());
		} else if (player.lvl == 10) {
			this._giveRandomWeapon(player, weapons.getTier2Weapons());
		} else if (player.lvl % 15 == 0) {
			this._giveRandomWeapon(player, weapons.getAllWeapons());
		}
	
	}
	
	_giveRandomWeapon(player, weaponArray) {
		weaponArray = weaponArray.filter(weapon => !player.weapons.includes(weapon));
		if (weaponArray.length > 0) {
			var randomIndex = randomIntFromInterval(0, weaponArray.length-1);
			var newWeapon = weaponArray[randomIndex];
			player.weapons.push(newWeapon);
			$("#lvlUpWeaponContainer").show();
			$("#lvlUpWeapon").attr('src', newWeapon.sprite.img.src);
		}
	}
	
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}