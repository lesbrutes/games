class Hitsplat {
  constructor(img, damage, player) {
	this.img = img;
    this.damage = damage;
    this.opacity = 1;
    this.width = 30;
    this.height = 30;
    this.player = player;
  }
  
  show(context) {
	this.opacity = Math.max(this.opacity-0.01, 0);
	
	context.globalAlpha = this.opacity;
    context.drawImage(this.img, this.player.positionX+80, this.player.positionY+60,  this.width, this.height);
    
    context.fillStyle = "white";
	context.font = "14px Arial";
	context.fillText(this.damage, this.player.positionX+92, this.player.positionY+80);
	
	context.globalAlpha = 1;
  }
  
  isVisible() {
	return this.opacity > 0;
  }
}