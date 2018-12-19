const ICON = __dirname + '/images/icon.png'
const ICONFAILE = __dirname + '/images/iconFaile.png'
const { ipcMain, globalShortcut } = require('electron')
const exec = require('child_process').exec
const menubar = require('menubar')
const Store = require('electron-store')
const store = new Store()
const mb = menubar({ icon: ICONFAILE })
const state = { registered: false }

mb.on('ready', () => {
  console.log('app is ready')
  mb.app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })

  mb.app.on('window-all-closed', () => {
    // Stop quitting app.
  })

  state.keycode = store.get('keycode', false)
  if (state.keycode) {
    setGlobalShortcut(state.keycode)
  }
  if (!state.registered) mb.showWindow()
})

mb.on('after-hide', () => {
  // release mb.window resource
  mb.window.close()
})

ipcMain.on('terminate', () => {
  mb.app.quit()
})
ipcMain.on('state', (e) => {
  e.sender.send('stateReply', state)
})
ipcMain.on('keycode', (e, newKeycode) => {
  console.log('new keycode is ' + newKeycode)
  state.keycode = newKeycode
  store.set('keycode', newKeycode)
  delGlobalShortcut()
  if (newKeycode) setGlobalShortcut(newKeycode)
  e.sender.send('stateReply', state)
})
const delGlobalShortcut = (keycode) => {
  state.registered = false
  mb.tray.setImage(ICONFAILE)
  if (keycode) globalShortcut.unregister(keycode)
  else globalShortcut.unregisterAll()
}
const setGlobalShortcut = (keycode) => {
  // Register a 'keycode' shortcut listener.
  const ret = globalShortcut.register(keycode, (e) => {
    exec('start ms-cortana://Reactive/?ListeningMode=True', (error, stdout, stderr) => {
      if (error) console.error(error)
      if (stdout) console.log(stdout)
    })
  })
  if (ret) {
    mb.tray.setImage(ICON)
  } else {
    console.log('registration failed')
  }
  state.registered = ret
}
