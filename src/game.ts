import { geckos } from '@geckos.io/server'
import { config } from './config'

export class PhaserGame extends Phaser.Game {
  server: any
  io: any
  constructor(server) {
    super(config)
    this.server = server
    this.io = geckos
  }
}
