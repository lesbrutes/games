"use strict";

class Database {
  constructor() {
    this.url = "https://api.github.com/repos/lesbrutes-database/database/contents";
    this.username = "lesbrutes-database@outlook.com";
    this.token = "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";
    this.bruteConverter = new BruteJsonConverter();
  }
  
	createBrute(player, onSuccessCallback, onErrorCallback) {
		var jsonString = this.bruteConverter.toJson(player);
		var encodedString = btoa(jsonString);
		var myUrl = `${this.url}/brutes/${player.name}.json`;
		var jsonObject = {"message": "Updating " + player.name, "content": encodedString}
		var jsonObjectStringified = JSON.stringify(jsonObject);
		$.ajax({ url: myUrl, 
			headers: {
			    Authorization: 'Bearer '+ this.token
			},
	        data: jsonObjectStringified, 
	        datatType: 'json', 
	        type: 'PUT',
	        success: function(data) {
			    console.log('Create was performed.');
			    if (onSuccessCallback != null) {
					onSuccessCallback(player);
				}
			}.bind(this), 
			error: function(data) {
			    console.log('Create failed');
			    if (onErrorCallback != null) {
					onErrorCallback();
				}
			}.bind(this),
	    });
	}
	
	loadBrute(playerName, onSuccessCallback, onErrorCallback) {
		var myUrl = `${this.url}/brutes/${playerName}.json`
		$.ajax({ url: myUrl,
			headers: {"Authorization": this.token}, 
	        type: 'GET',
	        success: function(data) {
			    console.log('Load was performed.');
			    var playerString = atob(data.content);
			    var loadedPlayer = this.bruteConverter.fromJson(playerString);
			    player1 = loadedPlayer;
			    if (onSuccessCallback != null) {
					onSuccessCallback(loadedPlayer);
				}
			}.bind(this),
			error : function(data) {
			    console.log('ERROR WHILE LOADING');
			    if (onErrorCallback != null) {
					onErrorCallback();
				}
			}.bind(this)
	    })
	}
	
	updateBrute(player) {
		var myUrl = `${this.url}/brutes/${player.name}.json`
		$.ajax({ url: myUrl,
			headers: {"Authorization": this.token}, 
	        type: 'GET',
	        success: function(data) {
			    this.update(player, data.sha);
			}.bind(this),
			error : function(data) {
			    console.log('ERROR SAVING :' + data);
			}.bind(this)
		});

	}
	
	update(player, sha) {
		var jsonString = this.bruteConverter.toJson(player);
		var encodedString = btoa(jsonString);
		var myUrl = `${this.url}/brutes/${player.name}.json`;
		var jsonObject = {"message": "Updating " + player.name, "content": encodedString, "sha": sha}
		var jsonObjectStringified = JSON.stringify(jsonObject);
		$.ajax({ url: myUrl, 
			headers: {
			    Authorization: 'Bearer '+ this.token
			},
	        data: jsonObjectStringified, 
	        datatType: 'json', 
	        type: 'PUT',
	        success: function() {
			    console.log('Update was performed.');
			}.bind(this), 
			error: function(data) {
			    console.log('Update failed: ' + data);
			}.bind(this),
	    });
	}
}

class BruteJsonConverter {
  constructor() {

  }
  
	toJson(player) {
		return `{
			"name": "${player.name}",
		 	"lvl": ${player.lvl},
		 	"xp": ${player.xp},
		 	"totalXp": ${player.totalXp},
		 	"hp": ${player.hp},
		 	"strenght": ${player.strenght},
		 	"defence": ${player.defence},
		 	"magic": ${player.magic},
		 	"range": ${player.range},
		 	"speed": ${player.speed},
		 	"agility": ${player.agility},
		 	"spriteType": 1
		}`;
	}
	
	fromJson(playerString) {
		var jsonObject = JSON.parse(playerString);
		
		var player = new Player(new MinotaureSprites(), 150, 350, Direction.Right); 
		
		player.name = jsonObject.name;
		player.lvl = jsonObject.lvl;
		player.xp = jsonObject.xp;
		player.totalXp = jsonObject.totalXp;
		player.setHp(jsonObject.hp);
		player.strenght = jsonObject.strenght;
		player.defence = jsonObject.defence;
		player.magic = jsonObject.magic;
		player.range = jsonObject.range;
		player.speed = jsonObject.speed;
		player.agility = jsonObject.agility;
		
		return player;
	}
}

var database = new Database();