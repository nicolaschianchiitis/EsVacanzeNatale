function handleLoginBtn() {
    const loginBtn = document.getElementById('loginBtn')
    const nickname = document.getElementById('nickname')
    
    nickname.value.length === 0 ? loginBtn.setAttribute('disabled', '') : loginBtn.removeAttribute('disabled')
}

function login() {
    const nickname = document.getElementById('nickname')

    if (sessionStorage.getItem('nickname') === null) {
        sessionStorage.setItem('nickname', nickname.value)
    }

    // Accesso alla pagina della chat nella stessa scheda (per sfruttare sessionStorage)
    window.location.href = "/chat"
}

window.onload = () => {
    const nickname = document.getElementById('nickname')
    const savedName = sessionStorage.getItem('nickname')

    if (savedName) {
        nickname.value = savedName
        nickname.setAttribute('disabled', '')
        handleLoginBtn()
    }
}