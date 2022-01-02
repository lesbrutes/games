class XpBar {
  constructor(player) {
	this.player = player;
    this.x = 50;
    this.xLvl = 20;
    this.y = 660;
    this.w = 0;
    this.h = 30;
    this.maxWidth = 300;
    this.color = "beige";
    this.baseXp = 20;
    this.minimumXpPerLevel = 80;
    this.xp = 0;
    this.totalXp = 0;
    this.maxXp = this.getRequiredXp();
    this.lvl = 1;
    this.lvlUpHandler = new LvlUpHandler();
  }

  show(context) {
	this.showLvl(context);
	this.showXp(context);
  }
  
  showLvl(context) {
	context.fillStyle = this.color;
	context.arc(this.xLvl, this.y+15, this.h/2, 0, 2 * Math.PI);
	context.stroke();
	context.fill();
	
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.fillText(this.lvl, this.xLvl-5, this.y+22);
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
  	return this.minimumXpPerLevel  + (this.player.lvl * this.baseXp);
  }

  gainXp() {
      this.xp += this.baseXp;
      this.totalXp += this.baseXp;
      this.checkLvlUp();
  }
  
  checkLvlUp() {
	if (this.xp >= this.getRequiredXp()) {
		this.xp = 0;
		this.lvl += 1;
		this.lvlUpHandler.lvlUp(this.player);
	}
	
  }
  
}