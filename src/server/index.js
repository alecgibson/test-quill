const http = require('http')
const express = require('express')
const ShareDB = require('sharedb')
const richText = require('rich-text')
const WebSocket = require('ws')
const WebSocketJSONStream = require('@teamwork/websocket-json-stream')

const PORT = 4000

ShareDB.types.register(richText.type)
const backend = new ShareDB()

const connection = backend.connect()
const bookContents = connection.get('bookContent', 'my-book')
bookContents.create({ chapters: [1] }, connect)

function connect () {
  const app = express()
  app.use(express.static('static'))
  app.use(express.static('node_modules/quill/dist'))
  const server = http.createServer(app)

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocket.Server({ server: server })
  wss.on('connection', function (ws) {
    const stream = new WebSocketJSONStream(ws)
    backend.listen(stream)
  })

  server.listen(PORT)
  console.log(`Listening on http://localhost:${PORT}`)
}
