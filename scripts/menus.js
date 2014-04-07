// Menu functions

// Game Over menu displays when the player has lost all lives
function gameOverMenu() {
    window.alert("game over");
}

//Level Complete menu displays when the player has finished a level
function levelCompleteMenu() {
    levelComplete = true;
    score += 100;
    window.alert("level done");
}

//Lost Life menu displays when the player has lost a life
function lostLifeMenu() {
    window.alert("lostlife");
}

//Display a menu to start the game
function gameStart() {
    
}