const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1'
const port = 3000

const mimeTypes = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '': 'application/octet-stream'
}

const routes = {
    '/': './public/html/index.html',
    '/chat': './public/html/chat.html',
    '/css': './public/css/style.css',
    '/js/client': './public/js/client.js',
    '/js/chat_frontend': './public/js/chat_frontend.js',
    '/js/login_client': './public/js/login_client.js',
}

let utentiConnessi = 0
let utenti = []

function requestHandler(req, res) {
    console.log(`--> Richiesta in entrata: ${req.url}`)
    if (routes.hasOwnProperty(req.url)) {
        fs.readFile(routes[req.url], 'utf-8', function(err, data) {
            if (err) {
                console.error(`!! Errore 500: errore interno del server.`)
                res.writeHead(500, {'Content-Type': mimeTypes['.txt']})
                res.end("Errore 500: errore interno del server.")
            } else {
                res.writeHead(200, {'Content-Type': mimeTypes[path.extname(routes[req.url])] || ''})
                res.write(data)
            }
            res.end()
        })
    } else {
        console.error(`!! Errore 404: risorsa non trovata.`)
        res.writeHead(404, {'Content-Type': mimeTypes['.txt']})
        res.end("Errore 404: risorsa non trovata.")
    }
}

const server = http.createServer(requestHandler)
server.listen(port, hostname, console.log(`Server in ascolto... http://${hostname}:${port}/`))

// Socket.IO - Server
let io = require('socket.io')(server)

io.sockets.on('connection', function(socket) {
    console.log(`# Nuova connessione. Socket ID utente: ${socket.id}.`)
    socket.username = `*ID: ${socket.id}`
    utenti.push({'socketID': socket.id, 'nickname': socket.username})
    utentiConnessi++
    console.log(`# Utenti connessi: ${utentiConnessi}.`)
    io.emit("utentiConnessi", utentiConnessi)

    socket.on('registraUtente', function(nickname) {
        if (!utenti.some(obj => obj.nickname === nickname)) {
            let index = utenti.findIndex(obj => obj.socketID === socket.id)
            utenti[index].nickname = nickname
            socket.username = nickname
            socket.emit('registrazioneValida', true)
        } else {
            socket.emit('registrazioneValida', false)
        }
    })

    socket.on('messaggio', function(data) {
        socket.broadcast.emit('messaggio', data)
    })

    socket.on('disconnect', function() {
        utenti.splice(utenti.findIndex(obj => obj.socketID === socket.id), 1)
        console.log(`# ${socket.username} disconnesso. (Socket ID: ${socket.id}).`)
        utentiConnessi--
        socket.broadcast.emit("utentiConnessi", utentiConnessi)
        console.log(`# Utenti connessi: ${utentiConnessi}.`)
    })
})