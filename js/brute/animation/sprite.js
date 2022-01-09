class PlayerSprite {
    constructor(source, totalSteps, weaponAngles, attachPointsX, attachPointsY, attachPointsLeftX, attachPointsLeftY, width, height, scale, speed, player) {

        this.img = new Image();
        this.source = source;
        this.img.classList = 
        this.step = 0;
        this.width = width;
        this.height = height;
        this.totalSteps = totalSteps; //Indexe a 0
        this.weaponAngles = weaponAngles;
        this.attachPointsX = attachPointsX;
        this.attachPointsY = attachPointsY;
        this.attachPointsLeftX = attachPointsLeftX;
        this.attachPointsLeftY = attachPointsLeftY;
        this.scale = scale;
        this.speed = speed;
        this.player = player;
    }
    
    updateDirection() {
		this.img.src = this.source + this.player.direction.name + ".png";
	}
	
	show(context) {
		this.updateDirection();
		if (this.player.activeWeapon != null && this.player.status != "dying") {
			this.player.activeWeapon.sprite.show(context, this.weaponAngles[Math.floor(this.player.spriteStep)],this.attachPointsX[Math.floor(this.player.spriteStep)],this.attachPointsY[Math.floor(this.player.spriteStep)],this.attachPointsLeftX[Math.floor(this.player.spriteStep)],this.attachPointsLeftY[Math.floor(this.player.spriteStep)], this.player);
		}
	    this.showPlayer(context);

    }
    
    showPlayer(context) {
		var s = this.scale; //Facteur d'aggrandissement
	    var step = Math.floor(this.player.spriteStep);
	    
	    context.drawImage(this.img, this.width*step, 0, this.width, this.height, this.player.positionX, this.player.positionY, this.width*s, this.height*s);
	    this.showWeaponInventory();
	}
	
	showWeaponInventory() {
		var offset = 20;
		var s = 0.8;
		
		if (this.player == player2) {
			this.player.getAvailableWeapons().forEach(function (weapon, i) {
		    	context.drawImage(weapon.sprite.img, 1150, 635-(i*offset), weapon.sprite.width*s, weapon.sprite.height*s)
			});
		} else {
			this.player.getAvailableWeapons().forEach(function (weapon, i) {
		    	context.drawImage(weapon.sprite.img, 10, 635-(i*offset), weapon.sprite.width*s, weapon.sprite.height*s)
			});
		}
	}
}


class WeaponSprite {
    constructor(source) {

        this.img = new Image();
        this.img.src = source;
        this.scale = 0.3;
        this.width = 280*this.scale;
        this.height = 100*this.scale;
        
        this.toRadians = Math.PI/180; 
    }
    
    show(context, angle, attachAtX, attachAtY, attachAtLeftX, attachAtLeftY, player) {
	    var angleInRadians;
	    var x;
	    var y;
	    
		if (player.direction == Direction.Left) {
			angleInRadians = (-angle+180)*this.toRadians;
			var x  = player.positionX + attachAtLeftX;
    		var y = player.positionY + attachAtLeftY;
		} else {
			angleInRadians = angle*this.toRadians;
			var x  = player.positionX + attachAtX;
    		var y = player.positionY + attachAtY;
		}

    	context.translate(x, y);
		context.rotate(angleInRadians);
		context.drawImage(this.img, 0, 0, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-x, -y);

    }
}