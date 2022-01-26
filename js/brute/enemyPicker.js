class EnemyPicker {
    constructor() {
		this.enemies = [];
		this.selectedIndex = -1;
    }
    
    pickEnemy() {
		if (this.selectedIndex != -1) {
			player2 = this.enemies[this.selectedIndex];
			this._hideEnemyPicker();
			startBattle();
		}
	}
    
    openEnemyPicker(player) {
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
		console.log("Enemy str = " + this.enemies[index].strenght);
		enemyDiv.find('.strength').html(this.enemies[index].strenght);
		enemyDiv.find('.speed').html(this.enemies[index].speed);
		enemyDiv.find('.agility').html(this.enemies[index].agility);
		enemyDiv.find('.enemyPreview').attr("src","../image/brute/brutes/"+this.enemies[index].spriteType+"/preview.png");
	}
	
	_displayEnemyPicker() {
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
		var enemy = new Player(975, 350, Direction.Left);
		while (player.lvl > enemy.lvl) {
			lvlUpHandler.lvlUp(enemy)
		}
		enemy.reset();
		
		enemy.name = names.getRandomName();
		
		return enemy;
	}
}