class PlayerSprite {
    constructor(source, totalSteps, weaponAngles, width, height, scale, speed, player) {

        this.img = new Image();
        this.img.src = source;
        this.img.classList = 
        this.step = 0;
        this.width = width;
        this.height = height;
        this.totalSteps = totalSteps; //Indexe a 0
        this.weaponAngles = weaponAngles;
        this.scale = scale;
        this.speed = speed;
        this.player = player;

		$(this.img).addClass("flip");
    }
	
	show(context) {
		if (this.player.activeWeapon != null) {
			this.player.activeWeapon.sprite.show(context, this.weaponAngles[Math.floor(this.player.spriteStep)], this.player);
		}
	    this.showPlayer(context);

    }
    
    
    showPlayer(context) {
		var translateX = this.player.positionX;
		if (this.player.direction == Direction.Left) {
			translateX = context.canvas.clientWidth + this.player.positionX - (this.width * this.scale);
			context.translate(translateX, 0);
			context.scale(-1, 1);
		}

		var s = this.scale; //Facteur d'aggrandissement
	    var step = Math.floor(this.player.spriteStep);
	    
	    context.drawImage(this.img, this.width*step, 0, this.width, this.height, this.player.positionX, this.player.positionY, this.width*s, this.height*s);
	    
	    if (this.player.direction == Direction.Left) {
			context.translate(-translateX, 0);
			context.scale(1, 1);
		}
	}
}


class WeaponSprite {
    constructor(source) {

        this.img = new Image();
        this.img.src = source;
        this.scale = 0.3
        this.width = 280*this.scale;
        this.height = 100*this.scale;
        
        this.toRadians = Math.PI/180; 
    }
    
    show(context, angle, player) {
	    var offsetX = 95;
	    var offsetY = 85;
	    var angleInRadians = angle*this.toRadians;
		if (player.direction == Direction.Left) {
			offsetX = -40;
			offsetY = 110;
			angleInRadians = (-angle+180)*this.toRadians;
		}
		
		var x  = player.positionX + offsetX;
    	var y = player.positionY + offsetY;

    	context.translate(x, y);
		context.rotate(angleInRadians);
		context.drawImage(this.img, 0, 0, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-x, -y);

    }
}