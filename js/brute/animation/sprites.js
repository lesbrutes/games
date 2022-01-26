class PlayerSprites {
    constructor(player) {
		var width = 720;
		var height = 490;
		
		var walkWeaponAngles = [-42,-42,-40,-40,-40,-42,-20,-5,-0,5,10,10,10,5,0,0,-2,-3,-4,-5,-20,-30,-40,-42,-42];
		var walkAttachX = [95,95,95,95,95,95,88,85,82,82,80,78,80,82,82,82,85,85,85,85,85,88,95,95,95];
		var walkAttachY = [92,92,90,90,90,90,83,80,80,75,72,70,72,75,75,75,78,78,78,79,85,90,90,92,92];
		var walkAttachLeftX = [65,65,65,65,65,65,75,80,80,80,90,90,90,90,90,90,90,85,85,85,75,70,65,65,65];
		var walkAttachLeftY = [115,115,115,115,115,115,110,110,110,105,105,105,105,105,105,105,105,105,105,110,110,110,115,115,115];
		
		var attackWeaponAngles = [-27,-32,-60,-80,-100,-120,-135,-140,-140,-150,-150,-150,-150,-140,-110,-80,-55,-32,-8,-8,-8,-8,-8,-12,-16];
		var attackAttachX = [95,95,108,112,118,125,125,125,125,125,125,125,125,125,125,120,108,105,95,95,95,95,95,95,95];
		var attackAttachY = [85,85,82,82,82,77,70,67,67,62,60,60,60,62,75,75,95,95,85,85,85,85,85,85,85];
	    var attackAttachLeftX = [70,65,50,40,30,30,35,40,40,40,40,42,42,35,28,32,45,60,70,70,70,70,70,70,70];
		var attackAttachLeftY = [115,110,105,95,80,60,45,40,40,35,35,33,33,40,65,92,110,120,115,115,115,115,110,110,110];

		var idleWeaponAngles = [-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32,-33,-32,-32,-31,-31,-30,-30,-29,-29,-28,-28,-27,-27];
		var idleAttachX = [95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95];
		var idleAttachY = [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85];
		var idleAttachLeftX = [70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70];
		var idleAttachLeftY = [115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115];

        this.Attack = new PlayerSprite("../image/brute/brutes/"+player.spriteType+"/attack-", 24, attackWeaponAngles,attackAttachX,attackAttachY, attackAttachLeftX,attackAttachLeftY,width, height, 0.25, 0.4, player);
        this.Idle = new PlayerSprite("../image/brute/brutes/"+player.spriteType+"/idle-", 24, idleWeaponAngles,idleAttachX,idleAttachY,idleAttachLeftX,idleAttachLeftY,  width, height, 0.25, 0.4, player);
        this.Walk = new PlayerSprite("../image/brute/brutes/"+player.spriteType+"/walking-", 24, walkWeaponAngles,walkAttachX,walkAttachY,walkAttachLeftX,walkAttachLeftY,width, height, 0.25, 0.4, player);
        this.Death = new PlayerSprite("../image/brute/brutes/"+player.spriteType+"/dying-", 24, [],[],[],[],[],width, height, 0.25, 0.4, player);
        this.Block = new PlayerSprite("../image/brute/brutes/"+player.spriteType+"/block-", 11, [],[],[],[],[],width, height, 0.25, 0.2, player);
    }
}4