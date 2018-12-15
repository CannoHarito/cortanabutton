const { ipcRenderer } = require('electron')

document.querySelector('#btnExit').addEventListener('click', () => {
    ipcRenderer.send('terminate')
})