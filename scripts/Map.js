//provides functions on map cells
var map;
var intelLocation;

//constructor for a new Cell object
function Cell() {
    this.hasFog = false;
    this.hasNinja = false;
    this.hasSpy = false;
    this.hasItem = "None";
    this.isRoom = false;
    this.hasIntel = false;
}

//constructor for coordinate system
function Coordinates() {
    this.xCoord = 0;
    this.yCoord = 0;
}

//places a new intel in the map
function placeIntel() {
    //remove any old intels
    for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
            if(map[x][y].isRoom){
            map[x][y].hasIntel = false;
            }
        }
    }
    
    
    
    //generate a random number between 0 and 8 to choose a room
    var room = Math.floor((Math.random()*9));
    
    // place intel
    switch (room) {
		case 0: 
			intelLocation.xCoord = 1;
			intelLocation.yCoord = 1;
			map[1][1].hasIntel = true;
			break;
		case 1: 
			intelLocation.xCoord = 1;
			intelLocation.yCoord = 4;
			map[1][4].hasIntel = true;
			break;
		case 2: 
			intelLocation.xCoord = 1;
			intelLocation.yCoord = 7;
			map[1][7].hasIntel = true;
			break;
		case 3: 
			intelLocation.xCoord = 4;
			intelLocation.yCoord = 1;
			map[4][1].hasIntel = true;
			break;
		case 4: 
			intelLocation.xCoord = 4;
			intelLocation.yCoord = 4;
			map[4][4].hasIntel = true;
			break;
		case 5: 
			intelLocation.xCoord = 4;
			intelLocation.yCoord = 7;
			map[4][7].hasIntel = true;
			break;
		case 6: 
			intelLocation.xCoord = 7;
			intelLocation.yCoord = 1;
			map[7][1].hasIntel = true;
			break;
		case 7: 
			intelLocation.xCoord = 7;
			intelLocation.yCoord = 4;
			map[7][4].hasIntel = true;
			break;
		case 8: 
			intelLocation.xCoord = 7;
			intelLocation.yCoord = 7;
			map[7][7].hasIntel = true;
			break;
		default: 
			break;
	}
}

function placeItems(bulletNumber, healthNumber) {
    //remove any old intel
    for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
            if(map[x][y].isRoom){
            map[x][y].hasItem = "None";
            }
        }
    }
    
    for(var i = 0; i < bulletNumber; i++) {
        placeItem("Bullet");
    }
    
    for(i = 0; i < healthNumber; i++) {
        placeItem("Health");
    }
}
    
function placeItem(itemName) {    
    
    //generate a random number between 0 and 8 to choose a room
    var room = Math.floor((Math.random()*9));
    
    // place bullets
    var itemPlaced = false;
    while (itemPlaced === false) {
        switch (room) {
            case 0:
                //check if room has intel, if it does, place in next room
                if(map[1][1].hasIntel === true || map[1][1].hasItem != "None") {
                    room = 1;
                }
                else {
                    map[1][1].hasItem = itemName;
                    itemPlaced = true;
                }
			break;
		case 1: 
            //check if room has intel, if it does, place in next room
            if(map[1][4].hasIntel === true || map[1][4].hasItem != "None") {
                room = 2;
            }
            else {
                map[1][4].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 2: 
            //check if room has intel, if it does, place in next room
            if(map[1][7].hasIntel === true || map[1][7].hasItem != "None") {
                room = 3;
            }
            else {
                map[1][7].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 3: 
			//check if room has intel, if it does, place in next room
            if(map[4][1].hasIntel === true || map[4][1].hasItem != "None") {
                room = 4;
            }
            else {
                map[4][1].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 4: 
			//check if room has intel, if it does, place in next room
            if(map[4][4].hasIntel === true || map[4][4].hasItem != "None") {
                room = 5;
            }
            else {
                map[4][4].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 5: 
            //check if room has intel, if it does, place in next room
            if(map[4][7].hasIntel === true || map[4][7].hasItem != "None") {
                room = 6;
            }
            else {
                    map[4][7].hasItem = itemName;
                    itemPlaced = true;
                }
			break;
		case 6: 
			//check if room has intel, if it does, place in next room
            if(map[7][1].hasIntel === true || map[7][1].hasItem != "None") {
                room = 7;
            }
            else {
                map[7][1].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 7: 
			//check if room has intel, if it does, place in next room
            if(map[7][4].hasIntel === true || map[7][4].hasItem != "None") {
                room = 8;
            }
            else {
                map[7][4].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		case 8: 
			//check if room has intel, if it does, place in next room
            if(map[7][7].hasIntel === true || map[7][7].hasItem != "None") {
                room = 0;
            }
            else {
                map[7][7].hasItem = itemName;
                itemPlaced = true;
            }
			break;
		default: 
			break;
        }
	}
}

//places the ninjas on the map
function placeNinjas(ninjas) {
    //remove any old ninjas
    for (var x = 0; y < 9; x++) {
		for (var y = 0; y < 9; y++) {
            if(map[x][y].hasNinja){
            map[x][y].hasNinja = false;
            }
        }
    }
    ninjaList = [];
    
    //place the specified number of ninjas
    for(var i = 0; i < ninjas; i++) {
        placeNinja();
    }
}

//places a single ninja on the map
function placeNinja() {
    //loop until a ninja is successfully placed
    while(true) {
        //generate a location to place a ninja
        var xCoord = Math.floor((Math.random()*9));
        var yCoord = Math.floor((Math.random()*9));
        
        if (!map[xCoord][yCoord].isRoom
						&& !map[xCoord][yCoord].hasSpy
						&& !map[xCoord][yCoord].hasNinja
						&& !(xCoord === 0 && yCoord == 5)
						&& !(xCoord === 0 && yCoord == 6)
						&& !(xCoord === 0 && yCoord == 7)
						&& !(xCoord === 0 && yCoord == 8)
						&& !(xCoord == 1 && yCoord == 5)
						&& !(xCoord == 1 && yCoord == 6)
						&& !(xCoord == 1 && yCoord == 7)
						&& !(xCoord == 1 && yCoord == 8)
						&& !(xCoord == 2 && yCoord == 5)
						&& !(xCoord == 2 && yCoord == 6)
						&& !(xCoord == 2 && yCoord == 7)
						&& !(xCoord == 2 && yCoord == 8)
						&& !(xCoord == 3 && yCoord == 5)
						&& !(xCoord == 3 && yCoord == 6)
						&& !(xCoord == 3 && yCoord == 7)
						&& !(xCoord == 3 && yCoord == 8)
				) {
				    map[xCoord][yCoord].hasNinja=true;
				    ninjaList.push(new Actor(xCoord, yCoord));
				    break;
				}
    }
    

    
}