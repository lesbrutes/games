class Cauldron {
	  constructor(code, damage, sprite) {
		this.code = code;
	    this.damage = damage;
	    this.sprite = sprite;
	    this.positionX = 100;
	    this.positionY = 450;
	  }
}

class Cauldrons {
	constructor() {
		this.eyecauldron = new Spell(1,0.5,  new CauldronSprite(0.22,30,"../image/brute/cauldron/eyecauldron.png"));
		this.lovecauldron = new Spell(2,0.5,  new CauldronSprite(0.3,0,"../image/brute/cauldron/lovecauldron.png"));
		this.manacauldron = new Spell(3,0.5,  new CauldronSprite(0.3,0,"../image/brute/cauldron/manacauldron.png"));
		this.poisoncauldron = new Spell(4,0.5,  new CauldronSprite(0.3,0,"../image/brute/cauldron/poisoncauldron.png"));
	}
	
	getCauldronByCode(code) {
		var all = this.getAllCauldrons();
		var result = all.filter(cauldron => cauldron.code == code);
		return result.length > 0 ? result[0] : null;
	}
	
	getTier1Cauldrons() {
		return [this.eyecauldron, this.lovecauldron, this.manacauldron, this.poisoncauldron];
	}
	
	getAllCauldrons() {
		return this.getTier1Cauldrons();
	}
}

class CauldronSprite {
    constructor(scale, offset, source) {
        this.img = new Image();
        this.img.src = source;
	
        this.scale = scale;
        this.width = 500*this.scale;
        this.height = 500*this.scale;
        this.offset = offset;
    }
    
    show(context, positionX, positionY) {
		context.drawImage(this.img, positionX,positionY+this.offset, this.width, this.height);

    }
}