$(document).ready(function () {
	var size = [window.width,window.height];
	$(window).resize(function(){
	    window.resizeTo(size[0],size[1]);
	});
	
	var farm = new Farm();
	window.farm = farm;
	farm.refreshScoreboard();
	farm.wander();
	farm.milk.startPriceVariation();
	farm.initRandomStormGenerating();
	setInterval(function(){farm.moveClouds(farm);}, 50);
	
	$('#buyCowBtn').bind('click', {self:farm}, farm.buyCow);
	$('#buyChickenBtn').bind('click', {self:farm}, farm.buyChicken);
	$('#goHomeBtn').bind('click', {self:farm}, farm.animalsGoHome);
	$('#wanderBtn').bind('click', {self:farm}, farm.wander);
	$('#sellMilkBtn').bind('click', {self:farm}, farm.sellMilk);
	$('#sellEggBtn').bind('click', {self:farm}, farm.sellEgg);
	
	$(document).on("click", ".milkBucket", function(){
	     farm.addMilk(this);
	});
	$(document).on("click", ".egg", function(){
	     farm.addEgg(this);
	});
});

function Farm() {	
	var self = this;
	this.money = 100;
	this.milk = new Milk();
	this.egg = new Egg();
	this.cows = [new Cow()];
	this.chickens = [];
	this.clouds = [new Cloud()];
	
	this.maxCows = 3;
	this.maxChicken = 5;
	
	/*Animals wandering*/
	this.wander = function(){
		self.wanderCows();
		self.wanderChickens();
	}
	this.wanderCows = function(){
		for (i=0; i<self.cows.length;i++){
			self.cows[i].removeIntervals();
			self.cows[i].wander();
		}	
	}
	this.wanderChickens = function(){
		for (i=0; i<self.chickens.length;i++){
			self.chickens[i].removeIntervals();
			self.chickens[i].wander();
		}	
	}
	
	/*Animals go home*/
	this.animalsGoHome = function(){
		self.goHomeCows();
		self.goHomeChickens();
	}
	
	this.goHomeCows = function(){
		for (i=0; i<self.cows.length;i++){
			self.cows[i].removeIntervals();
			self.cows[i].goHome();
		}
	}
	this.goHomeChickens = function(){
		for (i=0; i<self.chickens.length;i++){
			self.chickens[i].removeIntervals();
			self.chickens[i].goHome();
		}
	}
	
	/*Scoreboard refresh*/
	this.refreshScoreboard = function(){
		document.getElementById("moneyScore").innerHTML = this.money;
		document.getElementById("milkScore").innerHTML = this.milk.units;
		document.getElementById("eggScore").innerHTML = this.egg.units;
	}
	
	/*Cows*/
	this.buyCow = function(){
		if (self.money >= 300){
			self.money -= 300;
			self.cows.push(new Cow());
			self.wanderCows();
			self.refreshScoreboard();
		}
	}
	this.addMilk = function(milk){
		$(milk).remove();
		this.milk.add();
	}
	
	this.sellMilk = function(){
		var profit = self.milk.sellPrice();
		self.money += profit;
		self.milk.units = 0;
		self.refreshScoreboard();
	}
	
	/*Chickens*/
	this.buyChicken = function(){
		if (self.money >= 50){
			self.money -= 50;
			self.chickens.push(new Chicken());
			self.wanderChickens();
			self.refreshScoreboard();
		}
	}
	this.addEgg = function(egg){
		$(egg).remove();
		this.egg.add();
	}
	this.sellEgg = function(){
		if (self.egg.units >= 12){
			var profit = self.egg.sell12Price();
			self.money += profit;
			self.egg.units -= 12;
			self.refreshScoreboard();
		}
	}
	
	/*Clouds*/
	this.addCloud = function(){
		this.clouds.push(new Cloud());
	}
	this.stormCloud = function(){
		this.clouds.push(new StormCloud());
	}
	this.createStorm = function(){
		deleteAllRain();
		var self = this;
		var amount = random(2,4);
		var cpt = 0;
		var intervalId = setInterval(function(){generate(amount, cpt++, intervalId, self);}, 6000);
		function generate(amount, cpt, intervalId, self){
			if (cpt >= amount-1){
				clearInterval(intervalId);
			}
			self.stormCloud();
		}
	}
	this.initRandomStormGenerating = function(){
		var self = this;
		setInterval(function(){generate(self);}, 60000);
		function generate(self){
			var rand = random(0,100);
			if (rand < 15){
				self.createStorm();
			}
		}
	}
	this.moveClouds = function(farm){
		for (i=0; i<farm.clouds.length;i++){
			farm.clouds[i].move();
		}
	}
	this.removeHappinessOnRain = function(){
		for (i=0; i < this.clouds.length; i++){
			if ($(this.clouds[i]).hasClass("storm")){
				for (j=0; j < this.cows.length; i++){
					//TODO
				}
			}
		}
	}
}