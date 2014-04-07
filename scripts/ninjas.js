var ninjaList;

function Actor(x,y) {
    this.xCoord = x;
    this.yCoord = y;
}

function moveNinjas() {
    for(var i = 0; i < ninjaList.length; i++)
    {
        //store old ninja location 
        var x = ninjaList[i].xCoord;
        var y = ninjaList[i].yCoord;
        var newX;
        var newY;
        
        //generate a random direction
        var dir = Math.floor((Math.random()*4));
    
        //try to move in the direction, if it is an invalid spot,
        //try other directions
        for(var j = 0; j < 4; j++) {
            //move up
            if (dir === 0) {
                newX = x;
                newY = y - 1;
                //if move is invalid, try next direction
                if (newY < 0 || map[newX][newY].hasNinja || map[newX][newY].isRoom) {
                    dir = 1;
                }
                //if move places ninja on player, attack
                else if (map[newX][newY].hasSpy) {
                    //TODO implement ninja movement animation
                    break;
                }
                else {
                    moveNinja(i, dir);
                    break;
                }
            }
            //move down
            if (dir === 1) {
                newX = x;
                newY = y + 1;
                //if move is invalid, try next direction
                if (newY > 8 || map[newX][newY].hasNinja || map[newX][newY].isRoom) {
                    dir = 2;
                }
                //if move places ninja on player, attack
                else if (map[newX][newY].hasSpy) {
                    //TODO implement ninja movement animation
                    break;
                }
                else {
                    moveNinja(i, dir);
                    break;
                }
            }
            // move left
            if (dir === 2) {
                newX = x - 1;
                newY = y;
                //if move is invalid, try next direction
                if (newX < 0 || map[newX][newY].hasNinja || map[newX][newY].isRoom) {
                    dir = 3;
                }
                //if move places ninja on player, attack
                else if (map[newX][newY].hasSpy) {
                    //TODO implement ninja movement animation
                    break;
                }
                else {
                    moveNinja(i, dir);
                    break;
                }
            }
            // move right
            if (dir === 3) {
                newX = x + 1;
                newY = y;
                //if move is invalid, try next direction
                if (newX > 8 || map[newX][newY].hasNinja || map[newX][newY].isRoom) {
                    dir = 0;
                }
                //if move places ninja on player, attack
                else if (map[newX][newY].hasSpy) {
                    //TODO implement ninja movement animation
                    break;
                }
                else {
                    moveNinja(i, dir);
                    break;
                }
            }
        }
        //if all moves are invalid, then do not move
    }
}


function moveNinja(i, dir) {
    //TODO animate ninja[i] in the given direction
    //TODO Note: the draw method might just draw them in new spots when called
    var x = ninjaList[i].xCoord;
    var y = ninjaList[i].yCoord;
    //move up
    if(dir === 0){
        map[x][y].hasNinja = false;
        map[x][y-1].hasNinja = true;
        ninjaList[i].yCoord = y - 1;
    }
    //move down
    else if(dir == 1) {
        map[x][y].hasNinja = false;
        map[x][y+1].hasNinja = true;
        ninjaList[i].yCoord = y + 1;
        
    }
    //move left
    else if(dir == 2) {
        map[x][y].hasNinja = false;
        map[x-1][y].hasNinja = true;
        ninjaList[i].xCoord = x - 1;
    }
    //move right
    else if(dir == 3) {
        map[x][y].hasNinja = false;
        map[x+1][y].hasNinja = true;
        ninjaList[i].xCoord = x + 1;
    }
}

function removeNinja(x, y) {
    for(var i = 0; i < ninjaList.length; i++) {
        if(ninjaList[i].xCoord == x && ninjaList[i].yCoord == y) {
            ninjaList.splice(i,1);
        }
    }
    map[x][y].hasNinja = false;
}