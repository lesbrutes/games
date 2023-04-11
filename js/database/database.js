"use strict";

class Database {
  constructor() {
    this.url = "https://us-east-2.aws.data.mongodb-api.com/app/data-ebyhf/endpoint/data/v1";
    this.bruteConverter = new BruteJsonConverter();
    this.anonymousToken = null;
    this.anonymousTokenDate = null;
  }
  
  	validateToken() {
	    database._loadToken();
		return new Promise(function(resolve, reject){
			if (database.anonymousToken == null && database.anonymousTokenDate == null || (database.anonymousTokenDate != null && database._diff_minutes(database.anonymousTokenDate, new Date()) > 25 )) {
				database.refreshAnonymousToken(resolve, reject);
		    } else {
				resolve(database.anonymousToken);
			}
		})
	}
  
	createBrute(player, onSuccessCallback, onErrorCallback) {
		var db = this;
		this.validateUser(player.name).then(function(exist) {
			if (exist) {
				console.log("User already exists (Promise then)");	
				onErrorCallback();
				return;
			}
			db.validateToken().then(function(){
				var playerJsonString = db.bruteConverter.toJson(player);
				var playerJsonObject = JSON.parse(playerJsonString);
				var myUrl = `${db.url}/action/insertOne`;		
				
				var newData = JSON.stringify({
				    "collection": "brute",
				    "database": "lesbrutes",
				    "dataSource": "LesBrutesCluster",
				    "document": playerJsonObject
				});
				$.ajax({ url: myUrl, 
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer '+ db.getToken()
					},
			        data: newData, 
			        datatType: 'application/json', 
			        contentType: "application/json",
			        type: 'POST',
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
			}).catch(function(){
				
			})
		}).catch(function(err){
			console.log("User already exists (Promise catch): " + err);	
			onErrorCallback();
		});
	}
	
	loadBrute(playerName, onSuccessCallback, onErrorCallback) {
		var db = this;
		this.validateToken().then(function(){
			var searchData = JSON.stringify({
			    "collection": "brute",
			    "database": "lesbrutes",
			    "dataSource": "LesBrutesCluster",
			    "filter": { "name": playerName },
			    "limit": 1
			});
			
			var myUrl = `${db.url}/action/find`
			$.ajax({ url: myUrl,
				headers: {
					"Content-Type": "application/json",
					Authorization: 'Bearer '+ db.getToken()
				},
				data: searchData,
		        type: 'POST',
		        success: function(data) {
				    console.log('Load was performed.');
				    if (data == null || data.documents == null || data.documents.length < 1) {
						if (onErrorCallback != null) {
							onErrorCallback();
						}
					} else {
						var loadedPlayer = db.bruteConverter.fromJsonObject(data.documents[0]);
					    player1 = loadedPlayer;
					    if (onSuccessCallback != null) {
							onSuccessCallback(loadedPlayer);
						}
					}
				}.bind(this),
				error : function(data) {
				    console.log('ERROR WHILE LOADING');
				    if (onErrorCallback != null) {
						onErrorCallback();
					}
				}.bind(this)
		    })
	    }).catch(function(){
			
		})
	}
	
	updateBrute(player) {
		var db = this;
		this.validateToken().then(function(){
			var myUrl = `${db.url}/action/replaceOne`
			var playerJsonString = db.bruteConverter.toJson(player);
			var playerJsonObject = JSON.parse(playerJsonString);
			
			var updateData = JSON.stringify({
			    "collection": "brute",
			    "database": "lesbrutes",
			    "dataSource": "LesBrutesCluster",
			    "filter": { "name": player.name },
			    "replacement": playerJsonObject
			});
			
			$.ajax({ url: myUrl, 
				headers: {
					"Content-Type": "application/json",
					Authorization: 'Bearer '+ db.getToken()
				},
		        data: updateData, 
		        datatType: 'json', 
		        type: 'POST',
		        success: function() {
				    console.log('Update was performed.');
				}.bind(this), 
				error: function(data) {
				    console.log('Update failed: ' + data);
				}.bind(this),
		    });
	    	    }).catch(function(){
			
		}).catch(function(err){
			console.log("Update promise error: " + err);
		})

	}
	
	validateUser(playerName) {
		var db = this;
		return new Promise(function(resolve, reject){
			db.userExist(playerName, resolve, reject, db)
		})
	}
	
	
	userExist(playerName, resolve, reject, db) {
		this.validateToken().then(function(){
			var searchData = JSON.stringify({
			    "collection": "brute",
			    "database": "lesbrutes",
			    "dataSource": "LesBrutesCluster",
			    "filter": { "name": playerName },
			    "limit": 1
			});
			
			var myUrl = `${db.url}/action/find`
			
				$.ajax({ url: myUrl,
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer '+ db.getToken()
					},
					data: searchData,
			        type: 'POST',
			        success: function(data) {
					    if (data == null || data.documents == null || data.documents.length > 0) {
							resolve(true);
						}  else {
							resolve(false);
						}
					}.bind(this),
					error : function(data) {
					   	console.log("Error finding existing user: " + data);
					   	reject(data);
					}.bind(this)
			    })
		    })
	}
	
	getPlayer(playerName) {
		return new Promise(function(resolve, reject){
			database.validateToken().then(function(){
				var searchData = JSON.stringify({
				    "collection": "brute",
				    "database": "lesbrutes",
				    "dataSource": "LesBrutesCluster",
				    "filter": { "name": playerName },
				    "limit": 1
				});
				
				var myUrl = `${database.url}/action/find`
				$.ajax({ url: myUrl,
					headers: {
						"Content-Type": "application/json",
						Authorization: 'Bearer '+ database.getToken()
					},
					data: searchData,
			        type: 'POST',
			        success: function(data) {
					    console.log('Load was performed.');
					    if (data == null || data.documents == null || data.documents.length < 1) {
							reject(data);
						} else {
							var loadedPlayer = database.bruteConverter.fromJsonObject(data.documents[0]);
						    resolve(loadedPlayer);
						}
					}.bind(this),
					error : function(data) {
					    console.log('ERROR WHILE LOADING: ' + data);
					    reject(data);
					}
			    })
		    }).catch(function(){})
		})
	}
	
	getLeaderbord() {
		return new Promise(function(resolve, reject){
			database.validateToken().then(function(){
				var searchData = JSON.stringify({
				    "collection": "brute",
				    "database": "lesbrutes",
				    "dataSource": "LesBrutesCluster",
				    "sort": { "lvl": -1 },
				    "limit": 10
				});
				
				var myUrl = `${database.url}/action/find`
				
					$.ajax({ url: myUrl,
						headers: {
							"Content-Type": "application/json",
							Authorization: 'Bearer '+ database.getToken()
						},
						data: searchData,
				        type: 'POST',
				        success: function(data) {
						    resolve(data.documents);
						},
						error : function(data) {
						   	console.log("Error loading leaderbord: " + data);
						   	reject(data);
						}
				    })
			    }).catch(function(err){
					console.log("getLeaderbord validateToken promise error: " + err);
				})
			})
	}

	
	getToken() {
		return this.anonymousToken;
	}
	
	_diff_minutes(dt2, dt1) {
	  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
	  diff /= 60;
	  return Math.abs(Math.round(diff));
	 }
	
	refreshAnonymousToken(resolve, reject) {
		var myUrl = "https://realm.mongodb.com/api/client/v2.0/app/data-ebyhf/auth/providers/anon-user/login";
		$.ajax({ url: myUrl, 
	        type: 'POST',
	        success: function(data) {
			    console.log('Logged in anonymously: ' + data);
			    database.anonymousToken = data.access_token;
			    database.anonymousTokenDate = new Date();
			    database._saveToken();
			    resolve(data);
			}.bind(this), 
			error: function(data) {
			    console.log('Login failed: ' + data);
			    reject(data);
			}.bind(this),
	    });
	}
	
	_saveToken() {
		localStorage.setItem("token", database.anonymousToken);
		localStorage.setItem("tokenDate", database.anonymousTokenDate);
	}
	
	_loadToken() {
		database.anonymousToken = localStorage.getItem("token");
		database.anonymousTokenDate = localStorage.getItem("tokenDate") != null ? new Date(localStorage.getItem("tokenDate")) : null;
	}
}

class BruteJsonConverter {
  constructor() {

  }
  
	toJson(player) {
		var weaponCodes = player.weapons.map(function(weapon) { return weapon.code; });
		var weaponJson = JSON.stringify(weaponCodes);
		
		var spellCodes = player.spells.map(function(spell) { return spell.code; });
		var spellJson = JSON.stringify(spellCodes);
		
		var potionCodes = player.potions.map(function(potion) { return potion.code; });
		var potionJson = JSON.stringify(potionCodes);
		
		var cauldronCode = player.cauldron != null ? player.cauldron.code : null;
		var shieldCode = player.shield != null ? player.shield.code : null;
		
		return `{
			"name": "${player.name}",
		 	"lvl": ${player.lvl},
		 	"xp": ${player.xp},
		 	"totalXp": ${player.totalXp},
		 	"hp": ${player.hp},
		 	"strength": ${player.strength},
		 	"defence": ${player.defence},
		 	"magic": ${player.magic},
		 	"range": ${player.range},
		 	"speed": ${player.speed},
		 	"agility": ${player.agility},
		 	"weapons": ${weaponJson},
		 	"spells": ${spellJson},
		 	"potions": ${potionJson},
		 	"cauldron": ${cauldronCode},
		 	"shield": ${shieldCode},
		 	"spriteType": ${player.spriteType}
		}`;
	}
	
	fromJson(playerString) {
		var jsonObject = JSON.parse(playerString);
		return fromJsonObject(jsonObject);
	}
	
	fromJsonObject(playerJsonOjbect) {
		var jsonObject = playerJsonOjbect;
		
		var player = new Player(150, 350, Direction.Right, jsonObject.spriteType); 
		
		player.name = jsonObject.name;
		player.lvl = jsonObject.lvl;
		player.xp = jsonObject.xp;
		player.totalXp = jsonObject.totalXp;
		player.setHp(jsonObject.hp);
		player.strength = jsonObject.strength;
		player.defence = jsonObject.defence;
		player.magic = jsonObject.magic;
		player.range = jsonObject.range;
		player.speed = jsonObject.speed;
		player.agility = jsonObject.agility;
		if(jsonObject.shield != null) {
			player.shield = shields.getShieldByCode(jsonObject.shield);
		}
		if (jsonObject.cauldron != null) {
			player.cauldron = cauldrons.getCauldronByCode(jsonObject.cauldron);
		}
		if (jsonObject.weapons != null) {
			jsonObject.weapons.forEach(weaponCode => player.weapons.push(weapons.getWeaponByCode(weaponCode)));
		}
		if (jsonObject.spells != null) {
			jsonObject.spells.forEach(spellCode => player.spells.push(spells.getSpellByCode(spellCode)));
		}
		if (jsonObject.potions != null) {
			jsonObject.potions.forEach(potion => player.potions.push(potions.createPotion(potion)));
		}
		
		return player;
	}
}

var database = new Database();