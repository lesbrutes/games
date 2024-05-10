class Healsplat {
  constructor(img, damage, player) {
	this.img = img;
    this.damage = damage;
    this.opacity = 1;
    this.width = 45;
    this.height = 45;
    this.player = player;
  }
  
  show(context) {
	this.opacity = Math.max(this.opacity-0.005, 0);
	
	context.globalAlpha = this.opacity;
    context.drawImage(this.img, this.player.positionX+70, this.player.positionY+20,  this.width, this.height);
    
    context.fillStyle = "white";
	context.font = "18px Arial";
	context.fillText(this.damage, this.player.positionX+88, this.player.positionY+48);
	
	context.globalAlpha = 1;
  }
  
  isVisible() {
	return this.opacity > 0;
  }
}