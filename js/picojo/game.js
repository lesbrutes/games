class Game {
  constructor() {
	this.players = new Set();
	this.customPhrases = new Set();
	this.phrases = new PhraseRepo().getPhrases();;
	this.availableCustomPhrases = new Set();
	this.availablePhrases = new Set();
	this.questionCount = 0;
	
	this.resetSettings();
  }
  
  resetSettings() {
	this.resetAvailablePhrases();
	this.resetAvailableCustomPhrases();
	this.questionCount = 0;
  }
  
  resetAvailablePhrases() {
	var phrasesAsArray = Array.from(this.phrases);
	this._shuffle(phrasesAsArray);
	this.availablePhrases = new Set(phrasesAsArray);
  }
  
  resetAvailableCustomPhrases() {
	var phrasesAsArray = Array.from(this.customPhrases);
	this._shuffle(phrasesAsArray);
	this.availableCustomPhrases = new Set(phrasesAsArray);
  }
  
  _shuffle(array) {
	let currentIndex = array.length, randomIndex;
	while(currentIndex != 0) {
		//Pick a remaining element
		randomIndex = Math.floor(Math.random()*currentIndex);
		currentIndex--;
		
		//And swap it with the current element
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	
	return array;
  }

  addPlayer(player) {
	this.players.add(player);
  }
  
  addCustomPhrase(phrase) {
	this.customPhrases.add(phrase);
  }
  
  addPhrase(phrase) {
	this.phrases.add(phrase);
  }
  
  removePlayer(player) {
	this.players.delete(player);
  }
  
  removeCustomPhrase(phrase) {
	this.customPhrases.delete(phrase);
  }
  
  getRandomPhrase() {
	this.questionCount += 1;
	
	//A toute les 7 questions on prend une question custom
	if (this.availableCustomPhrases.size > 0 && _isMultipleOf(this.questionCount, 7)) {
		return this.getRandomFromSet(this.availableCustomPhrases, true).getQuestion(this.players);
	} else {
		return this.getRandomFromSet(this.availablePhrases, false).getQuestion(this.players);
	}
  }
  
  getRandomFromSet(mySet, isCustom) {
	if (mySet.size == 0) {
		if (isCustom) {
			return this.getRandomFromSet(this.availablePhrases);
		}
		this.resetAvailablePhrases();
	    alert("Out of phrases, restarting the game");
	}
	var randomIndex = Math.floor(Math.random() * mySet.size);
	var phrase = Array.from(mySet)[randomIndex];
    mySet.delete(phrase);
	while (!this._hasEnoughPlayers(phrase)) {
		if (mySet.size == 0) {
		    if (isCustom) {
				return this.getRandomFromSet(this.availablePhrases);
			}
			this.resetAvailablePhrases();
		    alert("Out of phrases, restarting the game");
		}
		randomIndex = Math.floor(Math.random() * mySet.size);
		phrase = Array.from(mySet)[randomIndex];
		mySet.delete(phrase);
	}
	
	return phrase;
  }

  
  _isMultipleOf(value, multiple) {
	return value != 0 ? value%multiple == 0 : false;
  }
  
  _hasEnoughPlayers(phrase) {
	return this.players.size >= phrase.getNumberOfPlayersRequired();
  }
  
}