function login() {
    // Salvataggio nickname nella sessionStorage (memorizzato finché la scheda è aperta)
    const nickname = document.getElementById('nickname').value
    sessionStorage.setItem('nickname', nickname)

    // Accesso alla pagina della chat nella stessa scheda
    window.location.href = "/public/html/chat.html"
}