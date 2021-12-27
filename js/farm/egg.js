function Egg() {
    this.units = 0;
    this.unitPrice = 0.5;
    
    this.add = function(){
    	this.units = this.units + 1;
    	document.getElementById("eggScore").innerHTML = this.units;
    };   
    
    this.sellPrice = function(){
    	return Math.round(this.units*this.unitPrice);
    }
    this.sell12Price = function(){
    	return Math.round(12*this.unitPrice);
    }
}