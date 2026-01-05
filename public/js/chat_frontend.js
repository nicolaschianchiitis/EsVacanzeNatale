function displayNickname() {
    document.getElementById('currentUser').innerText = sessionStorage.getItem('nickname') || '---'
}

function handleSendBtn() {
    const msg = document.getElementById('txtAreaMsg').value
    const btn = document.getElementById('btnInvia')

    msg.length === 0 ? btn.setAttribute('disabled', '') : btn.removeAttribute('disabled')
}

// Scorrimento dell'interfaccia verso il fondo solo se siamo già vicini al fondo
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