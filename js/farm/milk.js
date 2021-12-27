function Milk() {
    this.units = 0;
    this.unitPrice = 3.00;
    
    this.priceVariationInterval;
    
    this.add = function(){
    	this.units = this.units + 1;
    	document.getElementById("milkScore").innerHTML = this.units;
    };   
    
    this.sellPrice = function(){
    	return Math.round(this.units*this.unitPrice);
    }
    
    this.variatePrice = function(){
    	var variation = randomIntFromInterval(-4,5);
    	this.unitPrice = this.unitPrice + (this.unitPrice*variation/100);
    	var btnString = 'Sell milk (' + this.unitPrice.toFixed(2) + '$/unit)';
    	document.getElementById("sellMilkBtn").innerHTML = btnString;
    }
    
    this.startPriceVariation = function(){
    	this.priceVariationInterval = setInterval(this.variatePrice.bind(this), 180000);
    }
    this.stopPriceVariation = function(){
    	clearInterval(this.priceVariationInterval);
    }
    
    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}