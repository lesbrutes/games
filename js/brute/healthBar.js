class HealthBar {
  constructor(x, y, player) {
	this.player = player;
    this.x = x;
    this.y = y;
    this.w = 450;
    this.h = 30;
    this.maxWidth = 450;
    this.health = this.getMaxHealth();
    this.color = "green";
  }

  show(context) {
    context.lineWidth = 4;
    context.strokeStyle = "#333";
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.maxWidth, this.h);
    this.showName(context);
  }
  
  showName(context) {
	var yPadding = 50;
	var y = this.y+yPadding;
	context.font = "20px Arial";
	var nameWidth = context.measureText(this.player.name).width+20;
	if (this.player == player2) {
		var x = this.x+this.maxWidth-nameWidth;
		this._showNamePlate(x,y,nameWidth);
	} else {
		var x =  this.x;
		this._showNamePlate(x,y,nameWidth);
	}
  }
  
  _showNamePlate(x,y, nameWidth) {
	var height = parseInt(context.font, 10)+6;
	
	context.strokeStyle = "Chocolate";
	context.lineWidth = 2;
	context.textAlign = "center";
	context.fillStyle = '#F5CBA7';
	context.fillRect(x, y-17, nameWidth, height);
	context.strokeRect(x, y-17, nameWidth, height);
	context.fillStyle = "Chocolate";
	context.fillText(this.player.name, x+(nameWidth/2),  y+2);
  }

  updateHealth(val) {
    if (val >= 0) {
      this.health = val;
      this.w = (this.health / this.getMaxHealth()) * this.maxWidth;
    }
    
    if (val == 0) {
		this.player.dying();
		this.notifyDeath();
	}
  }
  
  getMaxHealth() {
	return this.player.hp
  }
  
  reset() {
	this.updateHealth(this.getMaxHealth());
	this.health = this.getMaxHealth();
  }
  
  notifyDeath() {
		this.player.activePotion = null;
        console.log("Notifying death");
        var event = new CustomEvent("death", { "detail": this.player });
        document.dispatchEvent(event);
  };
}