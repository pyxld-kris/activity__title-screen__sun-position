/**** WELCOME! *********************************************/
/**
 * Move the sun to the left side of the sky!
 * 
 * ----------------------------------------------------------
 * After making a change: save this file, then press the refresh
 * button above the game window!
 * ----------------------------------------------------------
 */
/**************** Start Modifying Here! *********************/

let GAME_TITLE = "Video Game:\nAn Adventure";
let TITLE_COLOR = 'rgb(0,0,0)'; // white
let BACKGROUND_COLOR = 'rgb(90,90,220)'; // sky blue

function createTitleScreen(scene) {
  /* Screen Width: 200 */
  /* Screen Height: 120 */

  /* create our background first */
  createBackground(100, 60);

  /* Now create the sun in the sky (top right corner) */
  createSun(200, 0);

  /* Create some mountains (from left to right) */
  createMountain(30, 70);
  createMountain(60, 80);
  createMountain(100, 50);
  createMountain(140, 70);
  createMountain(170, 90);

  /* create some clouds */
  createCloud(40, 10);
  createCloud(120, 25);
  createCloud(160, 20);

  /* Grassy field */
  createField(100, 100);

  /* Draw the lake */
  createLake(5, 95);

  /* Draw trees */
  createTree(30, 90);
  createTree(70, 100);
  createTree(130, 80);
  createTree(160, 100);


  /* Draw our game's title last so it's on top */
  createGameTitle(100, 30);

  /* Weather stuff */
  weather.startRain();
  //weather.startSnow();
}



/**** GOODBYE! ************************************************/
/**** Stop Modifying Here! (Unless you want to experiment!) ***/

/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**//* eslint-disable */ // Stops codesandbox from giving us annoying errors
/** The following code helps our activity work on a slightly deeper level */
let scene = this; // Setting this variable for readability

let gameWidth = this.game.config.width;
let gameHeight = this.game.config.height;
let halfGameWidth = gameWidth / 2;
let halfGameHeight = gameHeight / 2;


function createField(x, y) {
  let field = scene.add.rectangle(
    x,
    y,
    gameWidth,
    halfGameHeight/1.5,
    0x116611
  );
}

function createMountain(x, y) {
  let mountain = scene.add.triangle(
    x,
    y,
    0, 60,
    60, 60,
    30, 0,
    0x555555
  );
}

function createTree(x, y) {

  // Create the tree trunk
  let treeTrunk = scene.add.rectangle(
    x,
    y,
    8,
    25,
    0x551100
  );

  // Create leaves
  let treeLeaves = scene.add.circle(
    x,
    y-12,
    15,
    0x003300
  );

  treeLeaves.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    // Make the leaves shake a bit when the leaves are clicked
    makeShake(this);
  });
}

function createLake(x, y) {
  let lake = scene.add.ellipse(
    x, 
    y, 
    50, 
    20, 
    0x0000bb
  );
}

function createCloud(x, y) {
  // Center circle
  let centerCircle = scene.add.circle(
    x,
    y,
    11,
    0xffffff
  );
  // Left circle
  let leftCircle = scene.add.circle(
    x-12,
    y+2,
    8,
    0xffffff
  );
  // Right circle
  let rightCircle = scene.add.circle(
    x+12,
    y+2,
    8,
    0xffffff
  );
}

function createSun(x, y) {
  let sun = scene.add.circle(
    x,
    y,
    50,
    0xcccc00
  );

  scene.progressData.sun = sun;
}

function createBackground(x, y) {
  // Create a big rectangle to cover the full background
  let background = scene.add.rectangle(
    x,
    y,
    gameWidth,
    gameHeight,
    Phaser.Display.Color.ValueToColor(BACKGROUND_COLOR).color32
  );
}

function createGameTitle(x, y) {
  // create the game's title
  let title = scene.add.text(x, y, GAME_TITLE,{
    fontSize: "32px",
    fontFamily: '"Press Start 2P"',
    fill: TITLE_COLOR,
    align: "center",
    padding: { x: 1, y: 1 },
    backgroundColor: "transparent"
  })
  .setOrigin(0.5, 0.5)
  .setScrollFactor(0)
  .setResolution(3) // Makes text more crisp
  .setScale(0.5); // Makes text more crisp
}

//var startRain;
var weather = createWeather();
createTitleScreen(scene); // Call the function to create everything




// helper functions

/* eslint-enable */
