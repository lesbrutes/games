function Sprite(source, totalSteps, scale, speed) {
	
	this.img = new Image();
	this.source = source;
	this.width = 720;
	this.height = 490;
	this.standingPoint = 450
	this.totalSteps = totalSteps; //Indexe a 0
	this.scale = scale;
	this.speed = speed;
	
	this.updateSource = function(direction) {
		if (direction == null) {
			direction = Direction.Right.name;
		}
		this.img.src = source + direction + ".png";
	}
	
	this.updateSource();

}