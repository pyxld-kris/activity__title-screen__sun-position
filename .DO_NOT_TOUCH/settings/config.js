import Phaser from "phaser";
import PlayScene from "../scenes/PlayScene.js";

export var config = {
  type: Phaser.AUTO,
  width: 200,
  height: 120,
  parent: "game-container",
  pixelArt: true,
  autoRound: false,
  backgroundColor: "#000000",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 }
    }
  }
};
