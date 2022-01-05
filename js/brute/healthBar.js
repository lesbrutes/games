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
        console.log("Notifying death");
        var event = new CustomEvent("death", { "detail": this.player });
        document.dispatchEvent(event);
  };
}