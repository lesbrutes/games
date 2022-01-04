class Hitsplat {
  constructor(img, damage, positionX, positionY) {
	this.img = img;
    this.damage = damage;
    this.positionX = positionX;
    this.positionY = positionY;
    this.opacity = 1;
    this.width = 30;
    this.height = 30;
  }
  
  show(context) {
	this.opacity = Math.max(this.opacity-0.01, 0);
	
	context.globalAlpha = this.opacity;
    context.drawImage(this.img, this.positionX+80, this.positionY+60,  this.width, this.height);
    
    context.fillStyle = "white";
	context.font = "14px Arial";
	context.fillText(this.damage, this.positionX+92, this.positionY+80);
	
	context.globalAlpha = 1;
  }
  
  isVisible() {
	return this.opacity > 0;
  }
}