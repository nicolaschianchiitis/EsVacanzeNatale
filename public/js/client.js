// Connessione al server (WebSocket)
const socket = io('http://127.0.0.1:3000/')
console.log(`Connesso al server`)

// Socket.IO - Client
socket.emit('registraUtente', sessionStorage.getItem('nickname') ?? '')

socket.on('registrazioneValida', function(valida) {
    if (!valida) {
        disconnect()
        sessionStorage.setItem('loginError', '1')
    } else {
        sessionStorage.setItem('loginError', '0')
    }
})

socket.on('utentiConnessi', function(utentiConnessi) {
    showUtentiConnessi(utentiConnessi)
})

socket.on('messaggio', function(data) {
    addOtherBubble(data)
    smartSmoothScroll()
})

function disconnect() {
    // Disconnettiti dal socket
    socket.disconnect(socket)
    // Torna alla schermata di accesso
    window.location.href = '/'
}

function sendMsg() {
    const textArea = document.getElementById('txtAreaMsg')
    const dataOra = new Date().toLocaleString('it-IT') // Formato italiano: gg/mm/aaa, hh:mm:ss
    let msgObj = {
        'nickname': sessionStorage.getItem('nickname') ?? '',
        'text': textArea.value ?? '',
        'dateTime': dataOra
    }
    socket.emit('messaggio', msgObj)
    textArea.value = ''
    handleSendBtn()
    addMyBubble(msgObj)
    smartSmoothScroll()
}