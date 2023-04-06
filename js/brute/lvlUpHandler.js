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
		this._giveSpellIfPossible(player);
		this._giveCauldronIfPossible(player);

		if (player == player1) {
			$('#lvlUpModal').modal({ backdrop: 'static', keyboard: false })
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
			
			if (this.player == player1) {
				database.updateBrute(player1);
			}
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
	
	_giveSpellIfPossible(player) {
		$("#lvlUpSpellContainer").hide();
		if (player.lvl == 7) {
			this._giveRandomSpell(player, spells.getTier1Spells());
		} else if (player.lvl == 13) {
			this._giveRandomSpell(player, spells.getTier2Spells());
		} else if (player.lvl % 20 == 0) {
			this._giveRandomSpell(player, spells.getAllSpells());
		}
	}
	
	_giveRandomSpell(player, spellArray) {
		spellArray = spellArray.filter(spell => !player.spells.includes(spell));
		if (spellArray.length > 0) {
			var randomIndex = randomIntFromInterval(0, spellArray.length-1);
			var newSpell = spellArray[randomIndex];
			player.spells.push(newSpell);
			$("#lvlUpSpellContainer").show();
			$("#lvlUpSpell").attr('src', newSpell.sprite.img.src);
		}
	}
	
	_giveCauldronIfPossible(player) {
		$("#lvlUpCauldronContainer").hide();
		if (player.cauldron == null && player.lvl > 7 && player.lvl % 2 == 0) { 
			var rand = randomIntFromInterval(0, 100);
			if (rand >= 90) {
				this._giveRandomCauldron(player, cauldrons.getTier1Cauldrons());
			}
		}
	}
	
	_giveRandomCauldron(player, cauldronArray) {
		if (cauldronArray.length > 0) {
			var randomIndex = randomIntFromInterval(0, cauldronArray.length-1);
			var newCauldron = cauldronArray[randomIndex];
			player.cauldron = newCauldron;
			$("#lvlUpCauldronContainer").show();
			$("#lvlUpCauldron").attr('src', newCauldron.sprite.img.src);
		}
	}
	
	
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}