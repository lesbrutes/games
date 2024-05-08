class Spell {
	  constructor(code, damage, sprite) {
		this.code = code;
	    this.damage = damage;
	    this.sprite = sprite;
	    this.positionX = 150;
	    this.positionY = 415;
	  }
}

class Spells {
	constructor() {
		this.coldBall = new Spell(1,1.5,  new SpellSprite("../image/brute/spells/t1/coldBall.png"));
		this.lightBall = new Spell(2,1.5,  new SpellSprite("../image/brute/spells/t1/lightBall.png"));
		this.shadowBall = new Spell(3,1.5,  new SpellSprite("../image/brute/spells/t1/shadowBall.png"));
		
		this.ball21 = new Spell(4,2.2,  new SpellSprite("../image/brute/spells/t2/ball21.png"));
		this.ball22 = new Spell(5,2.2,  new SpellSprite("../image/brute/spells/t2/ball22.png"));
		this.ball23 = new Spell(6,2.2,  new SpellSprite("../image/brute/spells/t2/ball23.png"));
		this.ball24 = new Spell(7,2.2,  new SpellSprite("../image/brute/spells/t2/ball24.png"));
		
		this.ball31 = new Spell(8,3.5,  new SpellSprite("../image/brute/spells/t3/ball31.png"));
		this.ball32 = new Spell(9,3,  new SpellSprite("../image/brute/spells/t3/ball32.png"));
		this.ball33 = new Spell(10,3,  new SpellSprite("../image/brute/spells/t3/ball33.png"));
		this.ball34 = new Spell(11,3,  new SpellSprite("../image/brute/spells/t3/ball34.png"));
		this.ball35 = new Spell(12,3,  new SpellSprite("../image/brute/spells/t3/ball35.png"));
		
		this.animaball = new Spell(13,4,  new SpellSprite("../image/brute/spells/t4/animaball.png"));
		this.electroball = new Spell(14,4,  new SpellSprite("../image/brute/spells/t4/electroball.png"));
		this.fireball = new Spell(15,4,  new SpellSprite("../image/brute/spells/t4/fireball.png"));
		this.iceball = new Spell(16,4,  new SpellSprite("../image/brute/spells/t4/iceball.png"));
		this.poisonball = new Spell(17,4,  new SpellSprite("../image/brute/spells/t4/poisonball.png"));
		this.purpleball = new Spell(18,4,  new SpellSprite("../image/brute/spells/t4/purpleball.png"));
		this.sauronball = new Spell(18,4,  new SpellSprite("../image/brute/spells/t4/sauronball.png"));
	}
	
	getSpellByCode(code) {
		var all = this.getAllSpells();
		var result = all.filter(spell => spell.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	
	getTier1Spells() {
		return [this.coldBall, this.lightBall, this.shadowBall];
	}
	
	getTier2Spells() {
		return [this.ball21, this.ball22, this.ball23, this.ball24];
	}
	
	getTier3Spells() {
		return [this.ball31, this.ball32, this.ball33, this.ball34, this.ball35];
	}
	
	getTier4Spells() {
		return [this.animaball, this.electroball, this.fireball, this.iceball, this.poisonball, this.purpleball, this.sauronball];
	}
	
	getAllSpells() {
		return this.getTier1Spells().concat(this.getTier2Spells()).concat(this.getTier3Spells()).concat(this.getTier4Spells());
	}
	
	
}

class SpellSprite {
    constructor(source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale = 1;
        this.width = 64*this.scale;
        this.height = 64*this.scale;
        this.angle = 0;
        
        this.toRadians = Math.PI/180; 
    }
    
    show(context, positionX, positionY, step) {
	    this.angle += 7;
	    var angleInRadians = this.angle*this.toRadians;

		context.translate(positionX, positionY);
		context.rotate(angleInRadians);
		context.drawImage(this.img, -this.width/2,-this.height/2, this.width, this.height);
		context.rotate(-angleInRadians);
		context.translate(-positionX, -positionY);

    }
}