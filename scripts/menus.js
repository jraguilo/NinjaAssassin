var user1="user1", score1="score1", 
    user2="user2", score2="score2", 
    user3="user3", score3="score3";
    user4="user4", score4="score4", 
    user5="user5", score5="score5";
var text ="";
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
	if (scoresReceived == false) {
	    getScores();
	    scoresReceived = true;
	}
	ctx.fillText("1. " + user1 + " - " + score1, 225,175);
	ctx.fillText("2. " + user2 + " - " + score2, 225, 200);
	ctx.fillText("3. " + user3 + " - " + score3, 225,225);
	ctx.fillText("4. " + user4 + " - " + score4, 225, 250);
	ctx.fillText("5. " + user5 + " - " + score5, 225,275);
	ctx.fillText("Press R to Start Game", 225, 300);
	
	//var error, message;
	//ctx.fillText("error: "+error,225,350);
	//ctx.fillText("message: "+message,225,375);
}

function getScores() {
    
    var request = $.ajax({
                    //url: "/sinisterrecette/ninjaassassin/workspace/jsontest.txt", //test
                    url: "http://laravel-ninjaassasin.rhcloud.com/api/user/top",
                    type: "get"
                });
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        console.log(response);
        
        var data = JSON.parse(response);
        user1 = data.user1;
        user2 = data.user2;
        user3 = data.user3;
        user4 = data.user4;
        user5 = data.user5;
        score1 = data.score1;
        score2 = data.score2;
        score3 = data.score3;
        score4 = data.score4;
        score5 = data.score5;
        //error = data.error;
        //message = data.message;
    });
    
    return 55555;
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