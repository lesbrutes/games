class Leaderbord {
    constructor() {
		this.leaderbordModal = $("#leaderbordModal");
		this.table = document.getElementById("leaderbordTableBody");
		this.tableBody = document.getElementById("leaderbordTableBody");
    }
    
    show() {
		if (this.tableBody.childElementCount == 0) {
			leaderbord.update();
		}
		$("#leaderbordModal").modal('show');
	}
    
    update() {
		database.getLeaderbord().then(function(players) {
			players.forEach(function (player, i) {
			   leaderbord._addRow(i, player)
			});
			
		}).catch(function(data){
			debugger
			console.log("Error updating leaderbord: " + data);
			});
    }
    
    _addRow(index, player) {
		var entry = document.createElement('tr');
		
		var thRank = document.createElement('th');
		thRank.innerHTML = index+1;
		
		var tdName = document.createElement('td');
		tdName.innerHTML = player.name;
		
		var tdLvl = document.createElement('td');
		tdLvl.innerHTML = player.lvl;
		
		entry.appendChild(thRank);
		entry.appendChild(tdName);
		entry.appendChild(tdLvl);
		
		this.tableBody.appendChild(entry);
	}
	
	
}

var leaderbord = new Leaderbord();