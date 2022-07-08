import 'dotenv/config'

import http from 'http'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { PhaserGame } from './game'

// import { dirname } from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)

const game = new PhaserGame(server)
const port = process.env.EXPRESS_SERVER_PORT || 5001

const corsAllowed = ['*.awfulcode.co.uk', '*.local.dev']
app.use(cors({
  origin: corsAllowed,
}))

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  }),
)

app.get('/', (req, res) => {
  return `${req} - ${res}`
})

app.get('/getState', (_req, res) => {
  try {
    const gameScene = game.scene.keys.GameScene
    return res.json({ state: gameScene.getState() })
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${port}`)
})

export const main = app
