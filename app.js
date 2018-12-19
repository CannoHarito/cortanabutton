const { ipcRenderer } = require('electron')
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btnExit').addEventListener('click', () => {
        ipcRenderer.send('terminate')
    })
    document.querySelector('#slcKeycode').addEventListener('change', (e) => {
        document.querySelector('#keycodeState').innerHTML = "Changing..."
        ipcRenderer.send('keycode', event.target.value)
    })
    ipcRenderer.send('state')
})
ipcRenderer.on('stateReply', (e, state) => {
    if (state.keycode) {
        document.querySelector('#slcKeycode').value = state.keycode
        document.querySelector('#keycodeState').innerHTML
            = state.registered ? 'Registered' : 'Failed. Please turn off your media player and '
                + '<button onclick="document.querySelector(\'#slcKeycode\').dispatchEvent(new Event(\'change\'))">Retry</button>'
    } else {
        document.querySelector('#slcKeycode').value = ""
        document.querySelector('#keycodeState').innerHTML = ""
    }
})