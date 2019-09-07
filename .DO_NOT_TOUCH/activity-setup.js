import Phaser from "phaser";
import DevLaunchers from "./classes/dev-launchers";
import ProgressMonitor from "./classes/dev-launchers/activities/progress-monitor";

// Load specific game stuff here that will be used in
// this file, or in 'modify.mjs'

/* Lift classes to global scope */
(function() {
  // We have to lift classes we need access to into the
  //   global scope (stupid module scoping issue)
  // This is done so students can code in a clean script file (without
  //    having to use imports/exports, etc.)
  //
  // ie. window.Animal = Animal;
})();

var playScene;
export function setupActivity(scene) {
  /* Any pre setup code (additional from the game code) or
   * scene injection code needed to run this activity
   * should be executed here */

  new DevLaunchers.Activities.ProgressMonitor(scene, function() {
    if (!scene.progressData.sun) return;
    if (scene.progressData.sun.x < 100) {
      new DevLaunchers.Activities.Success.Noise(scene);
      this.destroy();
    }
  });

  // And now load the code students will be modifying
  playScene = scene;
  loadModifyCode(scene);
}

function makeShake(gameObject) {
  gameObject.scene.tweens.add({
    targets: [gameObject],
    scaleX: 1.1,
    scaleY: 1.1,
    ease: "Linear",
    duration: 50,
    yoyo: true,
    repeat: 0,
    callbackScope: gameObject
  });
}

function createWeather() {
  return {
    startRain: function() {
      let particleSpriteKey = generateSquareSprite(2);
      playScene.add.particles(particleSpriteKey).createEmitter({
        alpha: 1,
        angle: 0,
        //blendMode: 'MULTIPLY',
        emitZone: {
          source: new Phaser.Geom.Rectangle(0, -10, 200, -10)
        },
        frequency: 50,
        lifespan: 3000,
        quantity: 1,
        scale: 1,
        tint: 0x222299,
        gravityX: 20,
        gravityY: 150
      });
    },
    startSnow: function() {
      let particleSpriteKey = generateSquareSprite(1);
      playScene.add.particles(particleSpriteKey).createEmitter({
        alpha: 1,
        angle: 0,
        //blendMode: 'MULTIPLY',
        emitZone: {
          source: new Phaser.Geom.Rectangle(0, -10, 200, -10)
        },
        frequency: 50,
        lifespan: 7000,
        quantity: 1,
        scale: 1,
        tint: 0xffffff,
        gravityY: 30
      });
    }
  };
}
function generateSquareSprite(width) {
  // Returns key of generated sprite object
  let spriteKey = "square-sprite-" + width;

  var graphics = playScene.add
    .graphics()
    .fillStyle(0xffffff)
    .fillRect(0, 0, width, width)
    .generateTexture(spriteKey, width * 2, width * 2);
  graphics.destroy();

  return spriteKey;
}

/***************************/
/* HELPER FUNCTIONS FOLLOW */
/***************************/

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

/*
 * loadModifyCode()
 * Loads the 'modify.mjs' file students will be making changes in, and executes it in the
 * current module's scope. We're using this method instead of import to maintain scene scope
 * and keep import/export out of the modify.js script. This makes it more simple for the
 * students to work with.
 */
function loadModifyCode(scene) {
  // Let's load the modify.js script and run it in this scope!
  // using this method instead of import to maintain scene scope and keep import/export
  //    out of the modify.js script. More simple for students to work with
  /* eslint-disable */
  //var scene = this;
  let codeText = fetch("../modify.mjs")
    .then(function(response) {
      return response.text();
    })
    .then(function(textString) {
      evalWithinContext(scene, textString);
    });
  /* eslint-enable */
}
