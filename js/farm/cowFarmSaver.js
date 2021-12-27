$(document).ready(function () {
	setInterval(function(){ saveFarm(); }, 60000);
	window.onbeforeunload = saveFarm;
	
	function saveFarm(){
		var farm = window.farm;
		
		localStorage.setItem("money", farm.money);
		localStorage.setItem("milk", farm.milk.units);
		localStorage.setItem("egg",farm.egg.units);
		
		localStorage.setItem("cows",farm.cows.length);
		localStorage.setItem("chickens",farm.chickens.length);
	}
	
	function loadSave(){
		if (localStorage.getItem("money") == null ||localStorage.getItem("milk") == null ||localStorage.getItem("egg") == null ||
				localStorage.getItem("cows") == null || localStorage.getItem("chickens") == null){
			return;
		}
		var farm = window.farm;
		
		farm.money = Number(localStorage.getItem("money"));
		farm.milk.units = Number(localStorage.getItem("milk"));
		farm.egg.units = Number(localStorage.getItem("egg"));
		
		var cowsAmount = Number(localStorage.getItem("cows"));
		for(var i=0; i < cowsAmount-1; i++){
			farm.cows.push(new Cow());
		}
		var chickensAmount = Number(localStorage.getItem("chickens"));
		for(var i=0; i < chickensAmount; i++){
			farm.chickens.push(new Chicken());
		}
		
		farm.refreshScoreboard();
		farm.wander();
	}
	
	loadSave();
});
