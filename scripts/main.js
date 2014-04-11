var lives;
var ninjaCount;
var bulletsPlaced;
var bullets;
var healthPlaced;
var player;
//Game Phases: Preload, GameStarted, LevelComplete, LostLife, GameOver
var gamePhase = "Preload";
var shootMode = false;
var level;
var score;
var username;
var audio;
var audioPaused;

//Create the canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
canvas.width = 450;
canvas.height = 500;

//Preload Function
function preloading()
{	
	if (charImage.ready && bgReady)
	{
		clearInterval(preloader);
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;
		// Let's play this game!
		level = 1;
		lives = 3;
        score = 0;
        bullets = 3;
		document.addEventListener("keyup",keyUpHandler, false);
        audio = document.getElementById("audio");
        audio.play();
        audioPaused = false;
        audio.addEventListener("ended", playAudio, false);
		//start game loop
        gameloop = setInterval(update, TIME_PER_FRAME);	
	}
}


//starts a new game
function reset() {
    setLevel();
    initMap();
    intelLocation = new Coordinates();
    placeIntel();
    placeNinjas(ninjaCount);
    placeItems(bulletsPlaced,healthPlaced);
    map[0][8].hasSpy=true;
    player = new Actor(0,8);
    
    charX = CHAR_START_X;
    charY = CHAR_START_Y;

    currX = IMAGE_START_X;
    currY = IMAGE_START_EAST_Y;
    
    setFog();
}

//completes a game level
function levelComplete() {
    gamePhase = "LevelComplete";
    score += 100;
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
	map[4][7].isRoom = true;
	map[7][1].isRoom = true;
	map[7][4].isRoom = true;
	map[7][7].isRoom = true;
}


//------------
//Game Loop
//------------

function update() {
    if (gamePhase == "Preload") {
        renderStart();
    }
    else if (gamePhase == "GameStarted" ) {
        renderGame();
    }
    else if (gamePhase == "LevelComplete") {
        renderComplete();
    }
    else if (gamePhase == "LostLife") {
        renderLost();
    }
    else if (gamePhase == "GameOver") {
        renderGameOver();
    }
}


function renderGame()
{		
	//Clear Canvas
	ctx.fillStyle = "black";
    ctx.textAlign = 'left';
	ctx.drawImage(bgImage, 0,0);
    ctx.font = "bold 24px sans-serif";
	ctx.fillText("level: " + level + "   score: " + score, 0,24);
    ctx.fillText("lives: " + lives + "   bullets: " + bullets, 0, 48);
	drawMap();
	
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

function drawMap() {
    if (roomReady && intelReady && ninjaReady) {
	for (var y = 0; y < 9; y++) {
		for (var x = 0; x < 9; x++) {
		    //draw rooms and items
            if(map[x][y].hasFog) {
                ctx.drawImage(fogImage, x*50, y*50 + 50);
            }
            else {
                if(map[x][y].isRoom) {
                    ctx.drawImage(roomImage, x*50, y*50 + 50);
                    if(map[x][y].hasIntel)
                        ctx.drawImage(intelImage, x*50, y*50 + 50);
                        
                }
                //draw ninjas
                if(map[x][y].hasNinja) {
                    ctx.drawImage(ninjaImage,0,72,CHAR_WIDTH,CHAR_HEIGHT,
					    x*50,y*50 + 50,CHAR_WIDTH,CHAR_HEIGHT);
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
}

//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = "assets/player.png";

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



//------------
//Key Handlers
//------------

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	//Move up
	if (keyPressed == "W" && gamePhase == "GameStarted" && player.yCoord > 0) {
        moveUp();
	}
	
	//Move right
	else if (keyPressed == "D" && gamePhase == "GameStarted" && player.xCoord < 8) {
        moveRight();
	}
	
	//Move down
	else if (keyPressed == "S" && gamePhase == "GameStarted" && player.yCoord < 8) {
        moveDown();
	}
	
	//Move left
	else if (keyPressed == "A" && gamePhase == "GameStarted" && player.xCoord > 0) {	
        moveLeft();
	}
	//Pause/Resume audio
	else if (keyPressed == "M")
	{
        if (audioPaused){
            audio.play();
            audioPaused = false;
        }
        else {
            audio.pause();
            audioPaused = true;
	    }
	}
	else if (keyPressed == "R") {	
        //if level is complete, allow the R button to reset game
        if(gamePhase == "Preload") {
            gamePhase = "GameStarted";
            reset();
        }
        else if(gamePhase == "LevelComplete") {
            gamePhase = "GameStarted";
            level += 1;
            reset();
        }
        //if player was killed, but game is not over, allow R to reset game
        else if(gamePhase == "LostLife") {
            gamePhase = "GameStarted";
            reset();
        }
        //if game is over, allow the R button to reset game
        else if(gamePhase == "GameOver") {
            gamePhase = "GameStarted";
            level = 1;
		    lives = 3;
            ninjaCount = 1;
            bulletsPlaced = 1;
            healthPlaced = 1;
            score = 0;
            reset();
        }
	}
	//Arrow Key Up
	else if (event.keyCode == 38 && gamePhase == "GameStarted") {
	    if (player.yCoord > 0)
	        shoot(0);
	}
	//Arrow Key Down
	else if (event.keyCode == 40 && gamePhase == "GameStarted") {
	    if (player.yCoord < 8)
	        shoot(1);
	}
	//Arrow Key Left
	else if (event.keyCode == 37 && gamePhase == "GameStarted") {
	    if (player.xCoord > 0)
	        shoot(2);
	}
	//Arrow Key Right
	else if (event.keyCode == 39 && gamePhase == "GameStarted") {
	    if (player.yCoord > 0)
	        shoot(3);
	}
	
}

function moveUp() {
    map[player.xCoord][player.yCoord].hasSpy = false;
    player.yCoord = player.yCoord - 1;
    map[player.xCoord][player.yCoord].hasSpy = true;
    //animate movement
	moveUpAnim();
	//check if space has a ninja
	if(map[player.xCoord][player.yCoord].hasNinja) {
	    attack();
	}
	//check if space has item
	else if(map[player.xCoord][player.yCoord].hasItem != "None") {
	    grabItem(map[player.xCoord][player.yCoord].hasItem);
	    map[player.xCoord][player.yCoord].hasItem="None";
	}
	//check if space has intel
	else if(map[player.xCoord][player.yCoord].hasIntel) {
	    console.log("level done");
	    levelComplete();
	}
	moveNinjas();
	setFog();
}

function moveDown() {
    map[player.xCoord][player.yCoord].hasSpy = false;
	player.yCoord = player.yCoord + 1;
    map[player.xCoord][player.yCoord].hasSpy = true;
    moveDownAnim();
	if(map[player.xCoord][player.yCoord].hasNinja) {
	    attack();
	}
	//check if space has item
	else if(map[player.xCoord][player.yCoord].hasItem != "None") {
	    grabItem(map[player.xCoord][player.yCoord].hasItem);
	    map[player.xCoord][player.yCoord].hasItem="None";
	}
	//check if space has intel
	else if(map[player.xCoord][player.yCoord].hasIntel) {
	    levelComplete();
	}
	moveNinjas();
	setFog();
}

function moveLeft() {
    map[player.xCoord][player.yCoord].hasSpy = false;
	player.xCoord = player.xCoord - 1;
    map[player.xCoord][player.yCoord].hasSpy = true;
	moveLeftAnim();
	if(map[player.xCoord][player.yCoord].hasNinja) {
	    attack();
	}
	//check if space has item
	else if(map[player.xCoord][player.yCoord].hasItem != "None") {
	    grabItem(map[player.xCoord][player.yCoord].hasItem);
	    map[player.xCoord][player.yCoord].hasItem="None";
	}
	//check if space has intel
	else if(map[player.xCoord][player.yCoord].hasIntel) {
	    levelComplete();
	}
    moveNinjas();
    setFog();
}

function moveRight() {
    map[player.xCoord][player.yCoord].hasSpy = false;
	player.xCoord = player.xCoord + 1;
    map[player.xCoord][player.yCoord].hasSpy = true;
	moveRightAnim();
	if(map[player.xCoord][player.yCoord].hasNinja) {
	    attack();
	}
	//check if space has item
	else if(map[player.xCoord][player.yCoord].hasItem != "None") {
	    grabItem(map[player.xCoord][player.yCoord].hasItem);
	    map[player.xCoord][player.yCoord].hasItem="None";
	}
	//check if space has intel
	else if(map[player.xCoord][player.yCoord].hasIntel) {
	    levelComplete();
	}
	moveNinjas();
	setFog();
}

//Mobile input handlers
$("#game").swipe( {
    swipeUp:function(event, direction, distance, duration, fingerCount) {
        if(fingerCount == 2 ) {
            if (player.yCoord > 0)
	            shoot(0);
        }
        else if (gamePhase == "GameStarted" && player.yCoord > 0) {
            if(shootMode == true) {
                shoot(0);
                shootMode = false;
                document.getElementById("mobile").innerHTML = "";
            }
            else
                moveUp();
	    }
    },
    swipeDown:function(event, direction, distance, duration, fingerCount) {
        if(fingerCount == 2) {
            if (player.yCoord < 8)
	            shoot(1);
        }
        else if (gamePhase == "GameStarted" && player.yCoord < 8) {
            if(shootMode == true) {
                shoot(1);
                shootMode = false;
                document.getElementById("mobile").innerHTML = "";
            }
            else
                moveDown();
	    }
    },
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
        if(fingerCount == 2) {
            if (player.xCoord > 0)
	            shoot(2);
        }
        if (gamePhase == "GameStarted" && player.xCoord > 0) {
            if(shootMode == true) {
                shoot(2);
                shootMode = false;
                document.getElementById("mobile").innerHTML = "";
            }
            moveLeft();
	    }
    },
    swipeRight:function(event, direction, distance, duration, fingerCount) {
        if(fingerCount == 2) {
            if (player.xCoord < 8)
	            shoot(3);
        }
        if (gamePhase == "GameStarted" && player.xCoord < 8) {
            if(shootMode == true) {
                shoot(3);
                shootMode = false;
                document.getElementById("mobile").innerHTML = "";
            }
            moveRight();
	    }
    },
    tap:function(event, target) {
        //allow tap to start game
        if(gamePhase == "Preload") {
            gamePhase = "GameStarted";
            reset();
        }
        //if level is complete, allow taps to reset game
        else if(gamePhase == "LevelComplete") {
            gamePhase = "GameStarted";
            level += 1;
            reset();
        }
        //if player was killed, but game is not over, allow tap to reset game
        else if(gamePhase == "LostLife") {
            gamePhase = "GameStarted";
            reset();
        }
        //if game is over, allow tap to reset game
        else if(gamePhase == "GameOver") {
            gamePhase = "GameStarted";
            level = 1;
		    lives = 3;
            ninjaCount = 1;
            bulletsPlaced = 1;
            healthPlaced = 1;
            score = 0;
            reset();
        }
        //enable shoot mode for one finger swipe shooting
        else if (gamePhase == "GameStarted") {
            //toggle shootmode
            if (shootMode == false) {
                shootMode = true;
                document.getElementById("mobile").innerHTML = "Shoot Mode Enabled";
            }
            else {
                shootMode = false;
                document.getElementById("mobile").innerHTML = "Shoot Mode Disabled";
            }
        }
    },
    
    //double tap to mute/unmute music
    doubleTap:function(event, target) {
        if(audioPaused) {
            audioPaused = false;
            audio.play();
        }
        else {
            audioPaused = true;
            audio.pause();
        }
    },
    
    threshold:30
});

//Player animation functions
function moveLeftAnim() {
    facing = "W";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
    
}

function moveRightAnim() {
    facing = "E";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}

function moveUpAnim() {
    facing = "N";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}

function moveDownAnim() {
    facing = "S";
    for (var i = 0; i < 10; i++) {
    	isMoving = true;
    	update();
    };
}


function attack() {
    lives--;
    if(lives === 0) {
        gamePhase = "GameOver";
        //TODO submit score
        //send variable score
        //check if online
        if(navigator.onLine)
            sendScore(username,score);
    } 
    else {
        gamePhase = "LostLife";
    }
}

function sendScore(username,score){
    
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
    if (bullets > 0) {
        bullets --;
        //shoot up
        if(dir === 0){
            if (map[player.xCoord][player.yCoord - 1].hasNinja = true){ 
                removeNinja(player.xCoord,player.yCoord - 1);
                score += 50;
            }
        }
        //shoot down
        else if (dir == 1) {
            if (map[player.xCoord][player.yCoord + 1].hasNinja = true) {
                removeNinja(player.xCoord,player.yCoord + 1);
                score += 50;
            }
        }
        //shoot left
        else if (dir == 2) {
           if (map[player.xCoord - 1][player.yCoord].hasNinja = true) {
                removeNinja(player.xCoord - 1,player.yCoord);
                score += 50;
           }
        }
        //shoot right
        else if (dir == 3) {
            if (map[player.xCoord + 1][player.yCoord].hasNinja = true) {
                removeNinja(player.xCoord + 1,player.yCoord);
                score += 50;
            }
        }
    }
}

function setLevel() {
    //set number of ninjas
    ninjaCount = (level / 2);
    //set health packs
    if(level == 1 || (level % 4) === 0)        
        healthPlaced = 1;
    else
        healthPlaced = 0;
    //set bullets
    if(level == 1 || level % 3 === 0)
        bulletsPlaced = 1;
    else
        bulletsPlaced = 0;
}

//get methods


function setFog() {
    //turn fog of war on for all tiles
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            map[x][y].hasFog = true;
        }
    }
    //Turn on fog on current space
    map[player.xCoord][player.yCoord].hasFog = false;
    //Turn on fog to the top
    if(player.yCoord > 0)
        map[player.xCoord][player.yCoord - 1].hasFog = false;
    if(player.yCoord < 8)
        map[player.xCoord][player.yCoord + 1].hasFog = false;
    //Turn on fog to right
    if(player.xCoord < 8)
        map[player.xCoord+1][player.yCoord].hasFog = false;
    //Turn on fog to left
    if(player.xCoord > 0)
        map[player.xCoord-1][player.yCoord].hasFog = false;

}

function playAudio() {
    if(audioPaused == false)
        audio.play();
}
