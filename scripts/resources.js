// Load resources

// Room Image
var roomReady = false;
var roomImage = new Image();
roomImage.onload = function () {
	roomReady = true;
};
roomImage.src = "assets/room.png";

// Intel Image
var intelReady = false;
var intelImage = new Image();
intelImage.onload = function () {
	intelReady = true;
};
intelImage.src = "assets/intel.png";

// Ninja Image
var ninjaReady = false;
var ninjaImage = new Image();
ninjaImage.onload = function () {
	ninjaReady = true;
};
ninjaImage.src = "assets/ninja_m.png";


// Health Pack Image
var healthReady = false;
var healthImage = new Image();
healthImage.onload = function () {
	healthReady = true;
};
healthImage.src = "assets/health.png";

// Gun Image
var gunReady = false;
var gunImage = new Image();
gunImage.onload = function () {
	gunReady = true;
};
gunImage.src = "assets/gun.png";

//Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "assets/background.png";

//Fog Image
var fogReady = false;
var fogImage = new Image();
fogImage.onLoad = function() {
  fogReady = true;  
};
fogImage.src = "assets/fog.png";