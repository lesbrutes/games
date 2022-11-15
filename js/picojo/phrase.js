class Phrase {
  constructor(question, sips) {
	this.question = question;
	this.sips = sips;
	this.SIP_INDICATOR = "%d";
    this.PLAYER_INDICATOR = "%s";
  }

  getQuestion(players) {
	var formattedQuestion = this.question.slice();
	
	formattedQuestion = formattedQuestion.replace(this.SIP_INDICATOR , this.sips);
	
	var playersCopy = new Set(players);
	while(formattedQuestion.includes(this.PLAYER_INDICATOR)) {
		formattedQuestion = formattedQuestion.replace(this.PLAYER_INDICATOR, this.getRandomPlayer(playersCopy));
	}
	
	return formattedQuestion;
  }
  
  getRandomPlayer(playersCopy) {
	var randomIndex = Math.floor(Math.random() * playersCopy.size);
	var playerName = Array.from(playersCopy)[randomIndex];
	playersCopy.delete(playerName);
	
	return playerName;
}
  
  getNumberOfPlayersRequired() {
	return this.question.split(this.PLAYER_INDICATOR).length-1;
  }
  
}