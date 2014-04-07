var spyLives;
var ninjaCount;
var bulletsPlaced;
var invinPlaced;
var player;
var levelComplete = false;
var level;

//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

//Player Information


//starts a new game
function reset() {
    initMap();
    briefcaseLocation = new Coordinates();
    placeBriefcase();
    placeNinjas(ninjaCount);
    placeItems(bulletsPlaced,invinPlaced);
    map[0][8].hasSpy=true;
    player = new Actor(0,8);
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
            else if(map[x][y].hasNinja)
                ctx.drawImage(ninjaImage,0,72,CHAR_WIDTH,CHAR_HEIGHT,
					x*50,y*50 + 50,CHAR_WIDTH,CHAR_HEIGHT);
            //draw Spy
            else if(map[x][y].hasSpy)
                ctx.drawImage(spyImage, x*50, y*50 + 50);
        }
    }
    }
}

// The main game loop
/*var main = function () {
	render();
};*/

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
		spyLives = 3;
        ninjaCount = 1;
        bulletsPlaced = 1;
        invinPlaced = 1;
        reset();
		
		gameloop = setInterval(update, TIME_PER_FRAME);			
		//document.addEventListener("keydown",keyDownHandler, false);	
		document.addEventListener("keyup",keyUpHandler, false);	
	}
}

//------------
//Key Handlers
//------------
/*function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "W")
	{		
		facing = "N";
		isMoving = true;
	}
	else if (keyPressed == "D")
	{	
		facing = "E";
		isMoving = true;		
	}
	else if (keyPressed == "S")
	{	
		facing = "S";
		isMoving = true;		
	}
	else if (keyPressed == "A")
	{	
		facing = "W";
		isMoving = true;		
	}
}*/

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if (keyPressed == "W") {
        map[player.xCoord][player.yCoord].hasSpy = false;
        player.yCoord = player.yCoord - 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		moveup();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    attack();
		}
		moveNinjas();
	}
	else if (keyPressed == "D") {
	    map[player.xCoord][player.yCoord].hasSpy = false;
	    player.xCoord = player.xCoord + 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		moveright();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    attack();
		}
		moveNinjas();
	}
	else if (keyPressed == "S") {
	    map[player.xCoord][player.yCoord].hasSpy = false;
	    player.yCoord = player.yCoord + 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		movedown();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    attack();
		}
		moveNinjas();
	}
	else if (keyPressed == "A") {	
		map[player.xCoord][player.yCoord].hasSpy = false;
		player.xCoord = player.xCoord - 1;
        map[player.xCoord][player.yCoord].hasSpy = true;
		moveleft();
		if(map[player.xCoord][player.yCoord].hasNinja) {
		    attack();
		}
        moveNinjas();
	}
	else if (keyPressed == "R") {	
        if(levelComplete) {
            reset();
        }
        else if(spyLives === 0) {
            reset();
        }
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
charX = CHAR_START_X;
charY = CHAR_START_Y;

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;

function update()
{		
	//Clear Canvas
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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

//TODO reinitialize board in case of a new game
function newLevel() {
    
}

