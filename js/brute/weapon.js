class Weapon {
	  constructor(code, damage, magicAffinity, sprite) {
		this.code = code;
	    this.damage = damage;
	    this.magicAffinity = magicAffinity;
	    this.sprite = sprite;
	  }
}

class Weapons {
	constructor() {
		//Melee Weapons
		this.stick = new Weapon(1,2.5,1,  new WeaponSprite("../image/brute/weapons/melee/stick.png"));
		this.club = new Weapon(2,2.5,1,  new WeaponSprite("../image/brute/weapons/melee/club.png"));
		this.stoneClub = new Weapon(3,2.5,1,  new WeaponSprite("../image/brute/weapons/melee/stoneClub.png"));
		this.stoneClub2 = new Weapon(4,2.5,1,  new WeaponSprite("../image/brute/weapons/melee/stone.png"));
		this.circleClub = new Weapon(5,2.5,1,  new WeaponSprite("../image/brute/weapons/melee/circleClub.png"));
		this.circleClub2 = new Weapon(6,2.5,1, new WeaponSprite( "../image/brute/weapons/melee/circleClub2.png"));
		
		this.stickStone = new Weapon(7,3.5,1,  new WeaponSprite("../image/brute/weapons/melee/stickNStone.png"));
		this.stickStone2 = new Weapon(8,3.5,1,  new WeaponSprite("../image/brute/weapons/melee/stickNStone2.png"));
		this.stickSword = new Weapon(9,3.5,1,  new WeaponSprite("../image/brute/weapons/melee/stickSword.png"));
		
		this.spikedClub = new Weapon(10,4.5,1,  new WeaponSprite("../image/brute/weapons/melee/spikedClub.png"));
		this.spikedClub2 = new Weapon(11,4.5,1,  new WeaponSprite("../image/brute/weapons/melee/spikedClub2.png"));
		this.spikedSword = new Weapon(12,4.5,1, new WeaponSprite( "../image/brute/weapons/melee/spikedSword.png"));
		
		
	    this.sword = new Weapon(13,4.5,1,  new WeaponSprite("../image/brute/weapons/melee/sword.png"));
	    this.metalSword = new Weapon(14,4.5,2,  new WeaponSprite("../image/brute/weapons/melee/metalSword.png"));
	    this.obsidianSword = new Weapon(15,4.5,2,  new WeaponSprite("../image/brute/weapons/melee/obsidianSword.png"));
	    this.axeSword = new Weapon(16,4.5,1,  new WeaponSprite("../image/brute/weapons/melee/axeSword.png"));
	    
	    this.axe = new Weapon(17,5.5,1,  new WeaponSprite("../image/brute/weapons/melee/axe.png"));
	    this.hookScythe = new Weapon(18,5.5,2,  new WeaponSprite("../image/brute/weapons/melee/hookScythe.png"));
	    this.scytheSword = new Weapon(19,5.5,3,  new WeaponSprite("../image/brute/weapons/melee/scytheSword.png"));
	    
	    //Magic Weapons
	    this.hookStaff = new Weapon(20,1.4,3,  new WeaponSprite("../image/brute/weapons/staves/basicHookStaff.png"));
	    this.hookStaff2 = new Weapon(21,1.4,3,  new WeaponSprite("../image/brute/weapons/staves/hook-staff.png"));
	    this.moonWand = new Weapon(22,1.4,3,  new WeaponSprite("../image/brute/weapons/staves/moonWand.png"));
	    this.orb = new Weapon(23,1.4,3,  new WeaponSprite("../image/brute/weapons/staves/orb.png"));
	    this.orbStaff = new Weapon(24,1.4,3,  new WeaponSprite("../image/brute/weapons/staves/orbStaff.png"));
	    
	    this.dimStaff = new Weapon(24,2,4,  new WeaponSprite("../image/brute/weapons/staves/dimStaff.png"));
	    this.hookStaff2 = new Weapon(26, 2,4,  new WeaponSprite("../image/brute/weapons/staves/goodHookStaff.png"));
	    this.goodMoonWand = new Weapon(27, 2,4,  new WeaponSprite("../image/brute/weapons/staves/goodMoonWand.png"));
	    this.orb2 = new Weapon(28, 2,4,  new WeaponSprite("../image/brute/weapons/staves/orb2.png"));
	    this.orbStaff2 = new Weapon(29, 2,4,  new WeaponSprite("../image/brute/weapons/staves/orbStaff2.png"));
	    
	    this.goldenWand = new Weapon(30, 2.5,5,  new WeaponSprite("../image/brute/weapons/staves/goldenWand.png"));
	    this.seaOrb = new Weapon(31, 2.5,5,  new WeaponSprite("../image/brute/weapons/staves/seaOrb.png"));
	    this.shadowFlameWand = new Weapon(31, 2.5,5,  new WeaponSprite("../image/brute/weapons/staves/shadowFlameWand.png"));
	    this.shadowWand = new Weapon(33, 2.5,5,  new WeaponSprite("../image/brute/weapons/staves/shadowWand.png"));
	}
	
	getWeaponByCode(code) {
		var result = this.getAllWeapons().filter(weapon => weapon.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	getTier1Weapons() {
		return this.getTier1MeleeWeapons().concat(this.getTier1MageWeapons());
	}
	
	getTier1MeleeWeapons() {
		return [this.stick, this.club, this.stoneClub, this.stoneClub2, this.circleClub, this.circleClub2];
	}
	
	getTier1MageWeapons() {
		return [this.hookStaff, this.hookStaff2, this.moonWand, this.orb, this.orbStaff];
	}
	
	getTier2Weapons() {
		return this.getTier2MeleeWeapons().concat(this.getTier2MageWeapons());
	}
	
	getTier2MeleeWeapons() {
		return [this.stickStone, this.stickStone2, this.stickSword];
	}
	
	getTier2MageWeapons() {
		return [this.dimStaff, this.hookStaff2, this.goodMoonWand, this.orb2, this.orbStaff2];
	}
	
	getTier3Weapons() {
		return this.getTier3MeleeWeapons().concat(this.getTier3MageWeapons());
	}
	
	getTier3MeleeWeapons() {
		return [this.spikedClub, this.spikedClub2, this.spikedSword, this.sword, this.metalSword, this.obsidianSword, this.axeSword];
	}
	
	getTier3MageWeapons() {
		return [this.goldenWand, this.seaOrb, this.shadowFlameWand, this.shadowWand];
	}
	
	getTier4Weapons() {
		return this.getTier4MeleeWeapons();
	}
	
	getTier4MeleeWeapons() {
		return [this.axe, this.hookScythe, this.scytheSword];
	}
	
	getAllMeleeWeapons() {
		return this.getTier1MeleeWeapons().concat(this.getTier2MeleeWeapons()).concat(this.getTier3MeleeWeapons()).concat(this.getTier4MeleeWeapons());
	}
	
	getAllMageWeapons() {
		return this.getTier1MageWeapons().concat(this.getTier2MageWeapons()).concat(this.getTier3MageWeapons());
	}
	
	getAllWeapons() {
		return this.getAllMeleeWeapons().concat(this.getAllMageWeapons());
	}
}

class WeaponSprite {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale =  0.3;
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
			x  = player.positionX + attachAtLeftX;
    		y = player.positionY + attachAtLeftY;
		} else {
			angleInRadians = angle*this.toRadians;
			x  = player.positionX + attachAtX;
    		y = player.positionY + attachAtY;
		}

    	context.translate(x, y);
		context.rotate(angleInRadians);
		context.drawImage(this.img, 0, 0, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-x, -y);

    }
}