const http = require('http')
const fs = require('fs')
const path = require('path')
const sock = require('socket.io')

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
    '/js/login_client': './public/js/login_client.js'
}

function requestHandler(req, res) {
    console.log(`--> Richiesta in entrata: ${req.url}`)
    if (routes.hasOwnProperty(req.url)) {
        const filePath = routes[req.url]
        const stream = fs.createReadStream(filePath, 'utf-8')

        res.writeHead(200, {'Content-Type': mimeTypes[path.extname(routes[req.url])] || ''})
        stream.on('error', function(err) {
            console.error(`!! Errore ${err.name}: ${err.message}`)
            if (err.name === "ENOENT") {
                res.writeHead(404, {'Content-Type': mimeTypes['.txt']})
                res.end("Errore 404: risorsa non trovata.")
            } else {
                res.writeHead(500, {'Content-Type': mimeTypes['.txt']})
                res.end("Errore 500: errore interno del server.")
            }
        })
        stream.pipe(res)
    } else {
        res.writeHead(404, {'Content-Type': mimeTypes['.txt']})
        res.end("Errore 404: risorsa non trovata.")
    }
}

const server = http.createServer(requestHandler)
server.listen(port, hostname, console.log(`Server in ascolto... http://${hostname}:${port}/`))