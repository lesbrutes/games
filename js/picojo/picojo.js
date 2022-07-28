class Picojo {
  constructor() {
	this.game = new Game();
  }
  
  playerPage() {
	var playerPageContent = document.getElementById("playerPageContent");
	var pageContent = document.getElementById("pageContent");
	this.displayPlayers();
	
	pageContent.classList.remove("d-flex");
	pageContent.innerHTML = playerPageContent.innerHTML;
  }
  
  phrasePage() {
	var phrasePageContent = document.getElementById("phrasePageContent");
	var pageContent = document.getElementById("pageContent");
	this.displayPhrases();
	
	pageContent.classList.remove("d-flex");
	pageContent.innerHTML = phrasePageContent.innerHTML;
  }
  
  gamePage() {
	var gamePageContent = document.getElementById("gamePageContent");
	var pageContent = document.getElementById("pageContent");
	
	pageContent.classList.add("d-flex");
	pageContent.innerHTML = gamePageContent.innerHTML;
  }
  
  addPlayer() {
	var playerInput = document.getElementById("playerInput");
	if (playerInput.value != null && playerInput.value.trim().length > 0) {
		this.game.addPlayer(playerInput.value);
		this.displayPlayers();
		playerInput.value="";
	}

  }
  
  addPlayerInDisplay(player) {
	var playerList = document.getElementById("playerList");
	
	const playerDiv = document.createElement("div");
	playerDiv.className = "d-flex mb-1 px-4 align-items-center justify-content-center";
	
	const playerNameDiv = document.createElement("div");
	playerNameDiv.innerHTML = player;
	playerNameDiv.className = "flex-grow-1";
	playerDiv.append(playerNameDiv);
	
	const playerRemoveBtn= document.createElement("button");
	playerRemoveBtn.innerHTML = "Remove";
	playerRemoveBtn.className = "btn btn-dark btn-block btn-round text-secondary";
	playerRemoveBtn.dataset.player = player;
	playerRemoveBtn.onclick=function(){
		picojo.removePlayer(player);
	}
	playerDiv.append(playerRemoveBtn);
	
	playerList.append(playerDiv);
  }
  
  removePlayer(player) {
	this.game.removePlayer(player);
	this.displayPlayers();
  }
  
  displayPlayers() {
	var playerList = document.getElementById("playerList");
	playerList.innerHTML = "";
	
	this.game.players.forEach(key => this.addPlayerInDisplay(key))
  }
  
  addPhrase() {
	var phraseInput = document.getElementById("phraseInput");
	if (phraseInput.value != null && phraseInput.value.trim().length > 0) {
		this.game.addCustomPhrase(phraseInput.value);
		this.displayPhrases();
		phraseInput.value="";
	}

  }
  
  addPhraseInDisplay(phrase) {
	var phraseList = document.getElementById("phraseList");
	
	const phraseDiv = document.createElement("div");
	phraseDiv.className = "d-flex mb-1 px-4 align-items-center justify-content-center";
	
	const phraseTextDiv = document.createElement("div");
	phraseTextDiv.innerHTML = phrase;
	phraseTextDiv.className = "flex-grow-1";
	phraseDiv.append(phraseTextDiv);
	
	const phraseRemoveBtn= document.createElement("button");
	phraseRemoveBtn.innerHTML = "Remove";
	phraseRemoveBtn.className = "btn btn-dark btn-block btn-round text-secondary";
	phraseRemoveBtn.dataset.phrase = phrase;
	phraseRemoveBtn.onclick=function(){
		picojo.removePhrase(phrase);
	}
	phraseDiv.append(phraseRemoveBtn);
	
	phraseList.append(phraseDiv);
  }
  
  removePhrase(phrase) {
	this.game.removeCustomPhrase(phrase);
	this.displayPhrases();
  }
  
  displayPhrases() {
	var phraseList = document.getElementById("phraseList");
	phraseList.innerHTML = "";
	
	this.game.customPhrases.forEach(key => this.addPhraseInDisplay(key))
  }
  
  next() {
	var questionDisplay = document.getElementById("questionDisplay");
	questionDisplay.innerHTML = this.game.getRandomPhrase();
  }
  
}

var picojo = new Picojo();
