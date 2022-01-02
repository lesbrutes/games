class HealthBar {
  constructor(x, y, player) {
    this.x = x;
    this.y = y;
    this.w = 450;
    this.h = 30;
    this.maxHealth = player.hp;
    this.maxWidth = 450;
    this.health = this.maxHealth;
    this.color = "green";
    this.player = player;
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
      this.w = (this.health / this.maxHealth) * this.maxWidth;
    }
    
    if (val == 0) {
		this.player.dying();
		this.notifyDeath();
	}
  }
  
  reset() {
	this.updateHealth(this.maxHealth);
  }
  
  notifyDeath() {
        console.log("Notifying death");
        var event = new CustomEvent("death", { "detail": this.player });
        document.dispatchEvent(event);
  };
}