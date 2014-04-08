var lives;
var ninjaCount;
var bulletsPlaced;
var bullets;
var healthPlaced;
var player;
var levelComplete = false;
var level;
var score;
var playerDead;

//Create the canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 450;
canvas.height = 500;

//Player Information


//starts a new game
function reset() {
    initMap();
    briefcaseLocation = new Coordinates();
    placeBriefcase();
    placeNinjas(ninjaCount);
    placeItems(bulletsPlaced,healthPlaced);
    map[0][8].hasSpy=true;
    player = new Actor(0,8);
    
    charX = CHAR_START_X;
    charY = CHAR_START_Y;

    currX = IMAGE_START_X;
    currY = IMAGE_START_EAST_Y;
}

function initMap() {
    // create map
	map = [];
	for (var y = 0; y < 9; y++) {
		var newRow = [];
		for (var x = 0; x < 9; x++) {
				newRow.push(new Cell());
		}
		map.push(newRow);
	}
	
	// create rooms
	map[1][1].isRoom = true;
	map[1][4].isRoom = true;
	map[1][7].isRoom = true;
	map[4][1].isRoom = true;
	map[4][4].isRoom = true;
	map[7][1].isRoom = true;
	map[7][4].isRoom = true;
	map[7][7].isRoom = true;
}

// Draw everything
var render = function () {
	drawMap();
};

function drawMap() {
    if (roomReady && caseReady && ninjaReady) {
	for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
		    //draw rooms and items
            if(map[x][y].isRoom) {
                if(map[x][y].hasBriefcase)
                    ctx.drawImage(caseImage, x*50, y*50 + 50);
                else
                    ctx.drawImage(roomImage, x*50, y*50 + 50);
            }
            //draw ninjas
            if(map[x][y].hasNinja) {
                ctx.drawImage(ninjaImage,0,72,CHAR_WIDTH,CHAR_HEIGHT,
					x*50,y*50 + 50,CHAR_WIDTH,CHAR_HEIGHT);
            }
            //draw Spy
            else if(map[x][y].hasSpy) {
                ctx.drawImage(spyImage, x*50, y*50 + 50);
            }
            //draw Items
            else if(map[x][y].hasItem == "Health") {
                ctx.drawImage(healthImage, x*50, y*50 + 50);
            }
            else if(map[x][y].hasItem == "Bullet") {
                ctx.drawImage(gunImage, x*50, y*50 + 50);
            }
        }
    }
    }
}

//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = "assets/warrior_m.png";

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
//ctx.fillRect(0,0,canvas.width,canvas.height);
//ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;

function preloading()
{	
	if (charImage.ready)
	{
		clearInterval(preloader);
		
		//Initialise game
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;
		// Let's play this game!
		level = 1;
		lives = 3;
        ninjaCount = 1;
        bulletsPlaced = 1;
        healthPlaced = 1;
        score = 0;
        bullets = 3;
        playerDead = false;
        reset();
		
		gameloop = setInterval(update, TIME_PER_FRAME);			
		//document.addEventListener("keydown",keyDownHandler, false);	
		document.addEventListener("keyup",keyUpHandler, false);	
	}
}

//------------
//Key Handlers
//------------

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	//Move up
	if (keyPressed == "W" && !playerDead && player.yCoord > 0) {
        map[player.xCoord][player.yCoord].hasSpy = false;
        player.yCoord = player.yCoord - 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
        //animate movement
		moveup();
		//check if space has a ninja
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    window.alert("you have been killed by a ninja. Press R to retry.");
		    attack();
		}
		//check if space has item
		else if(map[player.xCoord][player.yCoord].hasItem != "None") {
		    window.alert("Found Item");
		    grabItem(map[player.xCoord][player.yCoord].hasItem);
		    map[player.xCoord][player.yCoord].hasItem="None";
		}
		//check if space has briefcase
		else if(map[player.xCoord][player.yCoord].hasBriefcase) {
		    window.alert("level done");
		    levelCompleteMenu();
		}
		moveNinjas();
	}
	
	//Move right
	else if (keyPressed == "D" && !playerDead && player.xCoord < 8) {
	    map[player.xCoord][player.yCoord].hasSpy = false;
	    player.xCoord = player.xCoord + 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		moveright();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    window.alert("you have been killed");
		    attack();
		}
		//check if space has item
		else if(map[player.xCoord][player.yCoord].hasItem != "None") {
		    window.alert("Found Item");
		    grabItem(map[player.xCoord][player.yCoord].hasItem);
		    map[player.xCoord][player.yCoord].hasItem="None";
		}
		//check if space has briefcase
		else if(map[player.xCoord][player.yCoord].hasBriefcase) {
		    window.alert("level done");
		    levelCompleteMenu();
		}
		moveNinjas();
	}
	
	//Move down
	else if (keyPressed == "S" && !playerDead && player.yCoord < 8) {
	    map[player.xCoord][player.yCoord].hasSpy = false;
	    player.yCoord = player.yCoord + 1;
        map[player.xCoord][player.yCoord].hasSpy = true;

		movedown();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		            window.alert("you have been killed");
		    attack();
		}
		//check if space has item
		else if(map[player.xCoord][player.yCoord].hasItem != "None") {
		    window.alert("Found Item");
		    grabItem(map[player.xCoord][player.yCoord].hasItem);
		    map[player.xCoord][player.yCoord].hasItem="None";
		}
		//check if space has briefcase
		else if(map[player.xCoord][player.yCoord].hasBriefcase) {
		    window.alert("level done");
		    levelCompleteMenu();
		}
		moveNinjas();
	}
	
	//Move left
	else if (keyPressed == "A" && !playerDead && player.xCoord > 0) {	
		map[player.xCoord][player.yCoord].hasSpy = false;
		player.xCoord = player.xCoord - 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		moveleft();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    window.alert("you have been killed");
		    attack();
		}
		//check if space has item
		else if(map[player.xCoord][player.yCoord].hasItem != "None") {
		    window.alert("Found Item");
		    grabItem(map[player.xCoord][player.yCoord].hasItem);
		    map[player.xCoord][player.yCoord].hasItem="None";
		}
		//check if space has briefcase
		else if(map[player.xCoord][player.yCoord].hasBriefcase) {
		    window.alert("level done");
		    levelCompleteMenu();
		}
        moveNinjas();
	}
	else if (keyPressed == "R") {	
        //if level is complete, allow the R button to reset game
        if(levelComplete) {
            levelComplete = false;
            level += 1;
            reset();
        }
        //if player was killed, but game is not over, allow R to reset game
        else if(playerDead && lives > 0) {
            playerDead = false;
            reset();
        }
        //if game is over, allow the R button to reset game
        else if(playerDead && lives === 0) {
            playerDead = false;
            level = 1;
		    spyLives = 3;
            ninjaCount = 1;
            bulletsPlaced = 1;
            healthPlaced = 1;
            score = 0;
            reset();
        }
	}
	//Arrow Key Up
	else if (event.keyCode == 38) {
	    window.alert(String.fromCharCode(event.keyCode));
	    if (player.yCoord > 0)
	        shoot(0);
	}
	//Arrow Key Down
	else if (event.keyCode == 40) {
	    window.alert(String.fromCharCode(event.keyCode));
	    if (player.yCoord < 8)
	        shoot(1);
	}
	//Arrow Key Left
	else if (event.keyCode == 37) {
	    window.alert("shooting left");
	    if (player.xCoord > 0)
	        shoot(2);
	}
	//Arrow Key Right
	else if (event.keyCode == 39) {
	    window.alert("shooting right");
	    if (player.yCoord > 0)
	        shoot(3);
	}
	
}

function moveleft() {
    facing = "W";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
    
}

function moveright() {
    facing = "E";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}

function moveup() {
    facing = "N";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}

function movedown() {
    facing = "S";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}

//------------
//Game Loop
//------------


function update()
{		
	//Clear Canvas
	ctx.fillStyle = "grey";

	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 24px sans-serif";
	ctx.fillText("score: " + score + "     " + " level: " + level, 0,24);
    ctx.fillText("lives: " + lives + " bullets: " + bullets, 0, 48);
	render();
	
	if (isMoving)
	{
		if (facing == "N")
		{
			charY -= CHAR_SPEED;
			currY = IMAGE_START_NORTH_Y;
		}
		else if (facing == "E")
		{
			charX += CHAR_SPEED;
			currY = IMAGE_START_EAST_Y;
		}
		else if (facing == "S")
		{
			charY += CHAR_SPEED;
			currY = IMAGE_START_SOUTH_Y;
		}
		else if (facing == "W")
		{
			charX -= CHAR_SPEED;
			currY = IMAGE_START_WEST_Y;
		}
		
		currX += CHAR_WIDTH;
		
		if (currX >= SPRITE_WIDTH)
			currX = 0;
	}

	isMoving = false;
	
	//Draw Image
	ctx.drawImage(charImage,currX,currY,CHAR_WIDTH,CHAR_HEIGHT,
					charX,charY,CHAR_WIDTH,CHAR_HEIGHT);

}


function attack() {
    lives--;
    playerDead = true;
    //TODO Display a death message
    if(lives === 0) {
        gameOverMenu();
    }
    else{
        lostLifeMenu();
    }
}

function grabItem(itemName) {
    if(itemName == "Bullet") {
        bullets++;
        score += 10;
    }
    else if(itemName == "Health") {
        lives++;
        score += 10;
    }
}

function shoot(dir) {
    
    window.alert("shot made");
    //shoot up
    bullets --;
    if(dir === 0){
        if (map[player.xCoord][player.yCoord - 1].hasNinja = true) {
        
            window.alert("shooting Ninja");
            removeNinja(player.xCoord,player.yCoord - 1);
        }
    }
    //shoot down
    else if (dir == 1) {
        if (map[player.xCoord][player.yCoord + 1].hasNinja = true)
            removeNinja(player.xCoord,player.yCoord + 1);
    }
    //shoot left
    else if (dir == 2) {
        if (map[player.xCoord - 1][player.yCoord].hasNinja = true)
            removeNinja(player.xCoord - 1,player.yCoord);
    }
    //shoot right
    else if (dir == 3) {
        if (map[player.xCoord + 1][player.yCoord].hasNinja = true)
            removeNinja(player.xCoord + 1,player.yCoord);
    }
}

//get methods

function getScore() {
    
}
