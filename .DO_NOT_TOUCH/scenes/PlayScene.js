import Phaser from "phaser";

// Load specific game stuff here
//import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";

export default class PlayScene extends Phaser.Scene {
  preload() {
    //this.load.image("sky", "/.DO_NOT_TOUCH/assets/sky.png");
    // Load the pet's spritesheet
    /*
    this.load.spritesheet("pet", "/.DO_NOT_TOUCH/assets/pet.png", {
      frameWidth: 17,
      frameHeight: 21,
      margin: 0,
      spacing: 0
    });
    */
  }

  create() {
    let gameWidth = this.game.config.width;
    let gameHeight = this.game.config.height;
    let halfGameWidth = gameWidth / 2;
    let halfGameHeight = gameHeight / 2;

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update(time, delta) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}
