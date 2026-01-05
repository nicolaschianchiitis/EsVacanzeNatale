/**
 * Abilita e disabilita il bottone di accesso in base al
 * valore dell'input di testo (textbox)
 */
function handleLoginBtn() {
    const nickname = document.getElementById('nickname')
    
    nickname.value.length === 0 ? lockLoginBtn() : unlockLoginBtn()
}

/**
 * Salva il nickname nella SessionStorage e tenta la registrazione
 * sul server dopo esserti connesso tramite WebSocket
 */
function login() {
    const nickname = document.getElementById('nickname')

    hideErrorMessage()

    if (sessionStorage.getItem('nickname') === null || sessionStorage.getItem('loginError') === '1') {
        sessionStorage.setItem('nickname', nickname.value)
    }

    // Accesso alla pagina della chat nella stessa scheda (per sfruttare sessionStorage)
    window.location.href = "/chat"
}

/**
 * Mostra il messaggio di errore di accesso
 */
function showErrorMessage() {
    document.getElementById('errorMessage').style.display = 'flex'
}

/**
 * Nascondi il messaggio di errore di accesso
 */
function hideErrorMessage() {
    document.getElementById('errorMessage').style.display = 'none'
}

/**
 * Blocca la casella di testo di input del nickname
 */
function lockNicknameTextBox() {
    const nickname = document.getElementById('nickname')
    nickname.setAttribute('disabled', '')
}

/**
 * Sblocca la casella di testo di input del nickname
 */
function unlockNicknameTextBox() {
    const nickname = document.getElementById('nickname')
    nickname.removeAttribute('disabled')
}

/**
 * Blocca il bottone di accesso
 */
function lockLoginBtn() {
    const loginBtn = document.getElementById('loginBtn')
    loginBtn.setAttribute('disabled', '')
}

/**
 * Sblocca il bottone di accesso
 */
function unlockLoginBtn() {
    const loginBtn = document.getElementById('loginBtn')
    loginBtn.removeAttribute('disabled')
}

/**
 * Disabilita la textbox in caso di disconnessione (nome utente già scelto
 * per la sessione corrente. Se si volesse cambiare, aprirne una nuova.)
 */
window.onload = () => {
    const nickname = document.getElementById('nickname')
    const savedName = sessionStorage.getItem('nickname')
    const loginError = sessionStorage.getItem('loginError')

    if (savedName) {
        nickname.value = savedName
        lockNicknameTextBox()
        handleLoginBtn()
    }

    if (loginError === '1') {
        showErrorMessage()
        unlockNicknameTextBox()
        handleLoginBtn()
    } else {
        hideErrorMessage()
    }
}