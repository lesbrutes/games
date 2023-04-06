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
		this.coldBall = new Spell(1,2,  new SpellSprite("../image/brute/spells/t1/coldBall.png"));
		this.lightBall = new Spell(2,2,  new SpellSprite("../image/brute/spells/t1/lightBall.png"));
		this.shadowBall = new Spell(3,2,  new SpellSprite("../image/brute/spells/t1/shadowBall.png"));
		
		this.ball21 = new Spell(4,3,  new SpellSprite("../image/brute/spells/t2/ball21.png"));
		this.ball22 = new Spell(5,3,  new SpellSprite("../image/brute/spells/t2/ball22.png"));
		this.ball23 = new Spell(6,3,  new SpellSprite("../image/brute/spells/t2/ball23.png"));
		this.ball24 = new Spell(7,3,  new SpellSprite("../image/brute/spells/t2/ball24.png"));
		
		this.ball31 = new Spell(8,5,  new SpellSprite("../image/brute/spells/t3/ball31.png"));
		this.ball32 = new Spell(9,4,  new SpellSprite("../image/brute/spells/t3/ball32.png"));
		this.ball33 = new Spell(10,4,  new SpellSprite("../image/brute/spells/t3/ball33.png"));
		this.ball34 = new Spell(11,4,  new SpellSprite("../image/brute/spells/t3/ball34.png"));
		this.ball35 = new Spell(12,4,  new SpellSprite("../image/brute/spells/t3/ball35.png"));
		
		this.animaball = new Spell(13,5,  new SpellSprite("../image/brute/spells/t4/animaball.png"));
		this.electroball = new Spell(14,5,  new SpellSprite("../image/brute/spells/t4/electroball.png"));
		this.fireball = new Spell(15,5,  new SpellSprite("../image/brute/spells/t4/fireball.png"));
		this.iceball = new Spell(16,5,  new SpellSprite("../image/brute/spells/t4/iceball.png"));
		this.poisonball = new Spell(17,5,  new SpellSprite("../image/brute/spells/t4/poisonball.png"));
		this.purpleball = new Spell(18,5,  new SpellSprite("../image/brute/spells/t4/purpleball.png"));
		this.sauronball = new Spell(18,5,  new SpellSprite("../image/brute/spells/t4/sauronball.png"));
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