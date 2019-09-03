const shareDb = require('sharedb/lib/client')
const richText = require('rich-text')

shareDb.types.register(richText.type)

const socket = new WebSocket('ws://localhost:4000')
const connection = new shareDb.Connection(socket)

export default connection
