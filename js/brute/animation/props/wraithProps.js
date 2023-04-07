class WraithProps {
	    constructor() {
		this.width = 520;
		this.height = 420;
		this.scale = 0.32;
		this.speed = 0.2;
		
		this.blockTotalSteps = 11;
		this.deathTotalSteps = 12;
		
		this.walkTotalSteps = 12;
		this.walkWeaponAngles = [-10,-10,-12,-12,-13,-15,-15,-13,-12,-12,-10,-10];
		this.walkAttachX = [70,70,70,70,70,70,70,70,70,70,70,70];
		this.walkAttachY = [75,75,75,75,75,75,75,75,75,75,75,57];
		this.walkAttachLeftX = [90,90,90,90,90,90,90,90,90,90,90,90];
		this.walkAttachLeftY = [105,105,105,105,105,105,105,105,105,105,105,105];
		
		this.attackHitStep = 8;
		this.attackTotalSteps = 12;
		this.attackWeaponAngles = [-27,-32,-50,-50,-100,-120,-135,-140,-32,-32,15,15];
		this.attackAttachX = [75,75,80,80,75,75,65,65,75,75,80,80];
		this.attackAttachY = [80,80,75,75,65,65,75,75,80,80,70,70];
	    this.attackAttachLeftX = [75,75,70,70,75,75,75,75,75,75,85,85];
		this.attackAttachLeftY = [105,105,100,100,50,50,40,40,100,100,90,90];


		this.idleTotalSteps = 12;
		this.idleWeaponAngles = [-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-30,-29];
		this.idleAttachX = [75,75,75,75,75,75,75,75,75,75,75,75];
		this.idleAttachY = [80,80,80,80,80,80,80,80,80,80,80,80];
		this.idleAttachLeftX = [75,75,75,75,75,75,75,75,75,75,75,75];
		this.idleAttachLeftY = [105,105,105,105,105,105,105,105,105,105,105,105];
    }
}
