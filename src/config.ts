import '@geckos.io/phaser-on-nodejs'
import Phaser from 'phaser'
import { GameScene } from './scenes/game'

export const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-game',
  width: 1280,
  height: 960,
  zoom: 1,
  banner: false,
  audio: false,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  }
}