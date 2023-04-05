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
		this.coldBall = new Spell(1,2,  new SpellSprite("../image/brute/spells/coldBall.png"));
		this.lightBall = new Spell(2,2,  new SpellSprite("../image/brute/spells/lightBall.png"));
		this.shadowBall = new Spell(3,2,  new SpellSprite("../image/brute/spells/shadowBall.png"));
	}
	
	getSpellByCode(code) {
		var result = this.getAllSpells().filter(spell => spell.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	
	getTier1Spells() {
		return [this.coldBall, this.lightBall, this.shadowBall];
	}
	
	getAllSpells() {
		return this.getTier1Spells();
	}
}