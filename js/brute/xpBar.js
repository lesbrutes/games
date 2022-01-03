class XpBar {
  constructor(player) {
	this.player = player;
    this.x = 50;
    this.xLvl = 10;
    this.y = 660;
    this.w = 0;
    this.h = 30;
    this.maxWidth = 300;
    this.color = "beige";
    this.baseXp = 20;
    this.xp = 0;
    this.totalXp = 0;
    this.maxXp = this.getRequiredXp();
    this.lvlUpHandler = new LvlUpHandler();
  }

  show(context) {
	this.showLvl(context);
	this.showXp(context);
  }
  
  showLvl(context) {
	context.fillStyle = this.color;
	context.fillRect(this.xLvl, this.y, 35, this.h);
	context.strokeRect(this.xLvl, this.y, 35, this.h);
	
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.fillText(this.player.lvl, this.xLvl+12, this.y+22);
  }
  
  showXp(context) {
	this.w = (this.xp / this.getRequiredXp()) * this.maxWidth;
	
    context.lineWidth = 4;
    context.strokeStyle = "#333";
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }
  
  getRequiredXp() {
  	return this.player.lvl * this.baseXp;
  }

  gainXp() {
      this.xp += this.baseXp;
      this.totalXp += this.baseXp;
      this.checkLvlUp();
  }
  
  checkLvlUp() {
	if (this.xp >= this.getRequiredXp()) {
		this.xp = 0;
		this.lvlUpHandler.lvlUp(this.player);
	}
	
  }
  
}