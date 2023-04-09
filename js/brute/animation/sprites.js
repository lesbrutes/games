class PlayerSprites {
    constructor(player) {
	
		var props = null;
		switch(player.spriteType){
			case 1,2:
				props = new MinotaureProps();
				break;
			case 3:
				props = new WraithProps();
				break;
			default:
				props = new MinotaureProps();
		}

		var baseUrl = "../image/brute/brutes/"+player.spriteType.toString();
        this.Attack = new PlayerSprite(
							baseUrl+"/attack-", 
							props.width, 
							props.height, 
							props.attackTotalSteps, 
							props.attackWeaponAngles,
							props.attackAttachX,
							props.attackAttachY, 
							props.attackAttachLeftX,
							props.attackAttachLeftY,
							props.attackHitStep,
							props.scale, 
							props.speed,
							player);
							
		 this.Idle = new PlayerSprite(
							baseUrl+"/idle-", 
							props.width, 
							props.height, 
							props.idleTotalSteps, 
							props.idleWeaponAngles,
							props.idleAttachX,
							props.idleAttachY, 
							props.idleAttachLeftX,
							props.idleAttachLeftY,
							props.attackHitStep,
							props.scale, 
							props.speed,
							player);
						
		 this.Walk = new PlayerSprite(
							baseUrl+"/walking-", 
							props.width, 
							props.height, 
							props.walkTotalSteps, 
							props.walkWeaponAngles,
							props.walkAttachX,
							props.walkAttachY, 
							props.walkAttachLeftX,
							props.walkAttachLeftY,
							props.attackHitStep,
							props.scale, 
							props.speed,
							player);
							
		 this.Death = new PlayerSprite(
							baseUrl+"/dying-", 
							props.width, 
							props.height, 
							props.deathTotalSteps, 
							[],
							[],
							[], 
							[],
							[],
							props.attackHitStep,
							props.scale, 
							props.speed,
							player);
							
		this.Block = new PlayerSprite(
							baseUrl+"/idle-", 
							props.width, 
							props.height, 
							props.blockTotalSteps, 
							props.idleWeaponAngles,
							props.blockAttachX,
							props.blockAttachY, 
							props.blockAttachLeftX,
							props.blockAttachLeftY,
							props.blockHitStep,
							props.scale, 
							props.speed,
							player);
	}
}

class SpriteTypes {
  // Create new instances of the same class as static attributes
  static MINOTAURE1 = new SpriteTypes(1)
  static MINOTAURE2 = new SpriteTypes(2)
  static WRAITH1 = new SpriteTypes(3)

  constructor(type) {
    this.type = type
  }
  
}