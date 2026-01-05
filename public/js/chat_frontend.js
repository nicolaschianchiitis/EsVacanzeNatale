/**
 * Mostra il nickname scelto in alto al centro
 */
function displayNickname() {
    document.getElementById('currentUser').innerText = sessionStorage.getItem('nickname') ?? '---'
}

/**
 * Disabilita e abilita il tasto di invio messaggio in base al valore della TextArea
 */
function handleSendBtn() {
    const msg = document.getElementById('txtAreaMsg').value

    msg.length === 0 ? lockSendBtn() : unlockSendBtn()
}

/**
 * Blocca il bottone di invio messaggio
 */
function lockSendBtn() {
    const btn = document.getElementById('btnInvia')
    btn.setAttribute('disabled', '')
}

/**
 * Sblocca il bottone di invio messaggio
 */
function unlockSendBtn() {
    const btn = document.getElementById('btnInvia')
    btn.removeAttribute('disabled')
}

/**
 * Mostra il numero di utenti connessi
 * @param {number} utentiConnessi 
 */
function showUtentiConnessi(utentiConnessi) {
    document.getElementById('utentiConnessi').innerText = `${utentiConnessi}`
}

/**
 * Aggiungi una bolla per un mio messaggio (verde)
 * @param {object} msgObj 
 */
function addMyBubble(msgObj) {
    const chatContainer = document.getElementById('chatContainer')
    let msgDiv = document.createElement('div')
    msgDiv.className = 'msg me'
    let msgTxtSpan = document.createElement('span')
    msgTxtSpan.className = 'msgTxt'
    let msgTxtInfo = document.createElement('span')
    msgTxtInfo.className = 'msgInfo'
    msgTxtSpan.innerText = msgObj.text
    msgTxtInfo.innerText = `${msgObj.nickname}, ${msgObj.dateTime}`
    msgDiv.appendChild(msgTxtSpan)
    msgDiv.appendChild(msgTxtInfo)
    chatContainer.appendChild(msgDiv)
}

/**
 * Aggiungi una bolla per un messaggio degli altri
 * (grigio chiaro o grigio scuro)
 * @param {object} msgObj 
 */
function addOtherBubble(msgObj) {
    const chatContainer = document.getElementById('chatContainer')
    let msgDiv = document.createElement('div')
    msgDiv.className = 'msg other'
    let msgTxtSpan = document.createElement('span')
    msgTxtSpan.className = 'msgTxt'
    let msgTxtInfo = document.createElement('span')
    msgTxtInfo.className = 'msgInfo'
    msgTxtSpan.innerText = msgObj.text
    msgTxtInfo.innerText = `${msgObj.nickname}, ${msgObj.dateTime}`
    msgDiv.appendChild(msgTxtSpan)
    msgDiv.appendChild(msgTxtInfo)
    chatContainer.appendChild(msgDiv)
}

/**
 * Scorrimento dell'interfaccia verso il fondo solo se siamo già vicini al fondo
 */
function smartSmoothScroll() {
    const chat = document.getElementById('chatContainer')

    // Controlliamo a che altezza del contenitore della chat ci troviamo
    const isNearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 100

    if (isNearBottom) {
        chat.scrollTo({
            top: chat.scrollHeight,
            behavior: 'smooth'
        })
    }
}

displayNickname()