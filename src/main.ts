import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import path from 'path'
import fs from 'fs'
import geckos from '@geckos.io/server'

const app = express()

const server = http.createServer(app)
const io = geckos({
  portRange: {
    min: 27900,
    max: 27910
  }
})
// dir and filenames
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, 'src')))

app.use('/', express.static(path.join(__dirname, '/')))

app.listen(process.env.PORT, () => {
  console.log(`Static server started and listening on port ${process.env.PORT}`)
})

export const viteNodeApp = app