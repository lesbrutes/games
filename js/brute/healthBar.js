class HealthBar {
  constructor(x, y, maxHealth) {
    this.x = x;
    this.y = y;
    this.w = 450;
    this.h = 30;
    this.maxHealth = maxHealth;
    this.maxWidth = 450;
    this.health = maxHealth;
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
      this.w = (this.health / this.maxHealth) * this.maxWidth;
    }
  }
}