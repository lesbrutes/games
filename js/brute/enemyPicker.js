class EnemyPicker {
    constructor() {
		this.enemies = [];
		this.selectedIndex = -1;
		
		this.enemyInitialDirection = Direction.Left;
		this.enemyInitialX = 975;
		this.enemyInitialY = 350;
    }
    
    pickEnemy() {
		if (this.selectedIndex != -1) {
			player2 = this.enemies[this.selectedIndex];
			this._hideEnemyPicker();
			startBattle(false);
		}
	}
	
	battleEnemy(player, enemyName) {
		if (enemyName == null) {
			openEnemyPicker(player);
		} else {
			database.getPlayer(enemyName).then(function(player){
				player2=player;
				player2.setStartDirection(enemyPicker.enemyInitialDirection);
				player2.setInitialX(enemyPicker.enemyInitialX);
				player2.setInitialY(enemyPicker.enemyInitialY);
				player2.initHealthBar();
				$('#battlePlayerModal').modal('hide');
				startBattle(true);
			}).catch(function(e) {
				console.log(e);
				$("#playerDontExist").removeClass("d-none");
			});
		}
	}
    
    openEnemyPicker(player) {
		var enemyDivs = $('.enemy');
		enemyDivs.removeClass("border");
		
		this.selectedIndex = -1;
		this._generateEnemies(player);
		this._displayEnemyPicker();
		this._setEnemies();
	}
	
	onSelect(index) {
		this.selectedIndex = index;
		
		var enemyDivs = $('.enemy');
		enemyDivs.removeClass("border");
		
		var selectedDiv = enemyDivs.filter(function() { 
		  return $(this).data("index") == index 
		});
		selectedDiv.addClass("border");
	}
	
	_setEnemies() {
		for (let i = 0; i < this.enemies.length; i++) {
			this._setEnemy(i);
		} 
	}
	
	_setEnemy(index) {
		var enemyDiv = $('.enemy[data-index='+index+']');
		
		enemyDiv.find('.name').html(this.enemies[index].name);
		enemyDiv.find('.hp').html(this.enemies[index].hp);
		enemyDiv.find('.strength').html(this.enemies[index].strength);
		enemyDiv.find('.speed').html(this.enemies[index].speed);
		enemyDiv.find('.agility').html(this.enemies[index].agility);
		enemyDiv.find('.enemyPreview').attr("src","../image/brute/brutes/"+this.enemies[index].spriteType+"/preview.png");
	}
	
	_displayEnemyPicker() {
		$('#enemyPicker').modal({ backdrop: 'static', keyboard: false })
		$("#enemyPicker").modal('show');
	}
	
	_hideEnemyPicker() {
		$("#enemyPicker").modal('hide');
	}
	
	_generateEnemies(player) {
		this.enemies = [];
		for (let i = 0; i < 3; i++) {
			this.enemies.push(this._generateEnemy(player));
		} 
	}
    
    _generateEnemy(player) {
		var enemy = new Player(this.enemyInitialX, this.enemyInitialY, this.enemyInitialDirection);
		while (player.lvl > enemy.lvl) {
			lvlUpHandler.lvlUp(enemy)
		}
		enemy.reset();
		
		enemy.name = names.getRandomName();
		
		return enemy;
	}
}