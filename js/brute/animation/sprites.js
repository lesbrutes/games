class MinotaureSprites {
    constructor(player) {
		debugger;
		var width = 720;
		var height = 490;
		var weaponAngles = [];
//		var idleWeaponAngles = [-32,-32,-31,-31,-30,-30,-29,-29,-28,-28,-27,-27,-27,-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32];
		var idleWeaponAngles = [-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32,-33,-32,-32,-31,-31,-30,-30,-29,-29,-28,-28,-27,-27];
		var walkingWeaponAngles = [-42,-42,-42,-37,-32,-27,-22,-17,-12,-7,-2,-357,-352,-357,-2,-7,-12,-17,-22,-27,-32,-37,-42,-42,-42];
        this.Attack = new PlayerSprite("../image/brute/brutes/minotaure/minotaure-attack-RIGHT.png", 11, weaponAngles,width, height, 0.25, 0.4, player);
        this.Idle = new PlayerSprite("../image/brute/brutes/minotaure/minotaure-idle.png", 24, idleWeaponAngles, width, height, 0.25, 0.4, player);
        this.Walk = new PlayerSprite("../image/brute/brutes/minotaure/minotaure-walking-RIGHT.png", 24, walkingWeaponAngles,width, height, 0.25, 0.4, player);
        this.Death = new PlayerSprite("../image/brute/brutes/minotaure/minotaure-dying-RIGHT.png", 14, weaponAngles,width, height, 0.25, 0.4, player);
        this.Block = new PlayerSprite("../image/brute/brutes/minotaure/minotaure-block-RIGHT.png", 11, weaponAngles,width, height, 0.25, 0.2, player);
    }
}