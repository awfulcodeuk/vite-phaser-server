import { config } from './config'

export class PhaserGame extends Phaser.Game {
  constructor(server) {
    super(config)
    this.server = server
  }
}
