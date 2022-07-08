import geckos from '@geckos.io/server'
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation'

import pkg from 'phaser'
const { Scene } = pkg

const SI = new SnapshotInterpolation()

// dir and filenames
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const iceServers = [
  {
    urls: 'stun:openrelay.metered.ca:80',
  },
  {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
]

export class GameScene extends Scene {
  tick: number
  io: any
  constructor() {
    super({ key: 'GameScene' })
    this.tick = 0
  }

  init() {
    const geckosStartUDP = Number(String(process.env.GECKOS_UDP_START_PORT)) || 27900
    const geckosEndUDP = Number(String(process.env.GECKOS_UDP_END_PORT)) || 27920
    this.io = geckos({
      iceServers,
      portRange: {
        min: geckosStartUDP,
        max: geckosEndUDP,
      },
    })
    this.io.addServer(this.game.server)
  }

  getId() {
    // return ++this.playerId
  }

  getState() {
    return 'hi!'
  }

  create() {
    this.io.onConnection((channel) => {
      channel.onDisconnect(() => {
        /* if (!this.isResetting) {
          if (this.players.has(channel.id)) {
            const player = this.players.get(channel.id).avatar
            player.isConnected = false
            player.kill()
            channel.emit('removePlayer', channel.playerId)
          }
        } */
      })

      channel.on('getId', () => {
        /* if (this.players.size < 4) {
          channel.playerId = this.getId()
          channel.emit('getId', channel.playerId.toString(36))
        } else {
          channel.emit('too_many_players', this.players.size)
        } */
      })

      channel.on('addPlayer', (_data) => {

      })

      channel.on('playerMove', (_data) => {
        // if (this.players.has(channel.id)) this.players.get(channel.id).avatar.setMove(data)
      })

      channel.on('voteButton', () => {
        // this.players.get(channel.id).avatar.isVoting = !this.players.get(channel.id).avatar.isVoting
      })

      channel.emit('ready')
    })
  }

  update() {
    this.tick++
    // only send the update to the client at 15 FPS (save bandwidth)
    if (this.tick % 4 !== 0)
      return

    const avatars = []
    /* this.players.forEach(player => {
      const { channel, avatar } = player
      this.updatePlayer(avatar)
      avatars.push({ id: channel.id, x: avatar.x, y: avatar.y, playerNumber: avatar.playerID, isConnected: avatar.isConnected, isVoting: avatar.isVoting, playerAnimFrame: avatar.animFrame, bombRange: avatar.bombRange, maxBombs: avatar.maxBombs, speed: avatar.speed, isDead: avatar.isDead})
      if (avatar.isConnected && !avatar.isVoting) voteOutcome = false
    }) */

    const worldState = {
      players: avatars,
    }

    const snapshot = SI.snapshot.create(worldState)
    SI.vault.add(snapshot)

    // send all avatars and blocks to all players
    /* this.players.forEach(player => {
      const { channel } = player
      channel.emit('snapshot', snapshot)
    }) */
  }

  getNewEntityID() {
    // return ++this.globalEntityID
  }

  resetGame() {
    /*
    this.isResetting = true
    this.playerId = 0
    this.tick = 0
    this.blockIDCounter = 0
    this.players.forEach(player => {
      player.avatar.destroy()
    })
    this.players.clear()
    this.blocks.forEach(block => {
      block.blockEntity.destroy()
    })
    this.blocks.clear()
    this.bombs.forEach(bomb => {
      bomb.bombEntity.destroy()
    })
    this.bombs.clear()
    this.powerups.forEach(powerup => {
      powerup.powerupEntity.destroy()
    })
    this.powerups.clear()
    this.explosions.clear()
    this.lifetimeExplosionCount = 0
    this.spawnLocations = []
    this.globalEntityID = 0

    stagePowerupPool = initialStagePowerupPool

    this.spawnStage()

    this.isResetting = false
    */
  }
}
