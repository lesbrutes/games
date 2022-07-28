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
	
	debugger;
	while(formattedQuestion.includes(this.PLAYER_INDICATOR)) {
		formattedQuestion = formattedQuestion.replace(this.PLAYER_INDICATOR, this.getRandomPlayer(players));
	}
	
	return formattedQuestion;
  }
  
  getRandomPlayer(players) {
	var randomIndex = Math.floor(Math.random() * players.size);
	return Array.from(players)[randomIndex];
}
  
  getNumberOfPlayersRequired() {
	return this.question.split(this.PLAYER_INDICATOR).length-1;
  }
  
}