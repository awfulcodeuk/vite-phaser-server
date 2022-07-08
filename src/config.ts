import '@geckos.io/phaser-on-nodejs'
import { GameScene } from './scenes/gameScene'

export const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-game',
  width: 1280,
  height: 960,
  zoom: 1,
  banner: false,
  audio: {
    noAudio: true,
  },
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
}
