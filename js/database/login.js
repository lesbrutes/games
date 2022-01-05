document.addEventListener("DOMContentLoaded", function() {	
	document.getElementById('newBrute').addEventListener('click', function() {
		hideMessages();
		var playerName = $("#username").val();
		debugger;
		if (!playerName) {
			$("#chooseUsername").show();
			return;
		}
		
		var player = new Player(new MinotaureSprites(), 150, 350, Direction.Right);
		player.name = playerName;
		database.createBrute(player, onSuccessLoadCreate, onErrorCreate) 
	});
	
	document.getElementById('loadBrute').addEventListener('click', function() {
		hideMessages();
		var playerName = $("#username").val();
		database.loadBrute(playerName, onSuccessLoadCreate, onErrorLoad) 
	});
	
	$('#nameChooserModal').modal('show');
	hideMessages();
	
});

function onSuccessLoadCreate(player) {
	player1 = player;
	$('#nameChooserModal').modal('hide');
	newBattle();
}

function onErrorLoad() {
	$("#usernameNotExist").show();
}

function onErrorCreate() {
	$("#nameTaken").show();
}

function hideMessages() {
	$("#nameTaken").hide();
	$("#chooseUsername").hide();
	$("#usernameNotExist").hide();
}

