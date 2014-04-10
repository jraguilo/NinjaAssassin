var user1="user1", score1=300, 
    user2="usertwo", score2=200, 
    user3="userthree", score3=100;

// Menu functions

// Game Over menu displays when the player has lost all lives
function gameOverMenu() {
    window.alert("game over");
}

//Level Complete menu displays when the player has finished a level
function levelCompleteMenu() {
    
}

//Lost Life menu displays when the player has lost a life
function lostLifeMenu() {
    window.alert("lostlife");
}

//Display a menu to start the game
function gameStart() {
    
}

function renderStart() {
    ctx.drawImage(bgImage, 0,0);
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = 'center';
	ctx.fillText("High Scores:", 225,150);
	//get user and name
	//user1=
	ctx.fillText("1. " + user1 + " - " + score1, 225,175);
	ctx.fillText("2. " + user2 + " - " + score2, 225, 200);
	ctx.fillText("3. " + user3 + " - " + score3, 225,225);
	ctx.fillText("Press R to Start Game", 225,250);
}

function renderComplete() {
    ctx.drawImage(bgImage, 0,0);
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = 'center';
	ctx.fillText("You have found the intel!", 225,175);
	ctx.fillText("Press R to continue.", 225, 200);

}

function renderLost() {
    ctx.drawImage(bgImage, 0,0);
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = 'center';
	ctx.fillText("You have been killed!", 225,175);
	ctx.fillText("Press R to continue.", 225, 200);
}

function renderGameOver() {
    ctx.drawImage(bgImage, 0,0);
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = 'center';
	ctx.fillText("Game Over!", 225,175);
	ctx.fillText("Your Score:" + score, 225,200)
	ctx.fillText("Press R to start a new game.", 225, 225);
}