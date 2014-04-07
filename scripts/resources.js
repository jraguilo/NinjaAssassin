// Load resources

// Room Image
var roomReady = false;
var roomImage = new Image();
roomImage.onload = function () {
	roomReady = true;
};
roomImage.src = "assets/room.png";

// Case Image
var caseReady = false;
var caseImage = new Image();
caseImage.onload = function () {
	caseReady = true;
};
caseImage.src = "assets/case.png";

// Ninja Image
var ninjaReady = false;
var ninjaImage = new Image();
ninjaImage.onload = function () {
	ninjaReady = true;
};
ninjaImage.src = "assets/ninja_m.png";

// Spy Image
var spyReady = false;
var spyImage = new Image();
spyImage.onload = function () {
	spyReady = true;
};
spyImage.src = "assets/spy.png";