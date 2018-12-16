const ICON = __dirname + '/images/icon.png'
const ICONFAILE = __dirname + '/images/iconFaile.png'
const { ipcMain, globalShortcut } = require('electron')
const exec = require('child_process').exec
const menubar = require('menubar')

const mb = menubar({ icon: ICONFAILE })

mb.on('ready', () => {
  console.log('app is ready')
  // Register a 'CommandOrControl+X' shortcut listener.
  globalShortcut.unregister('MediaPreviousTrack')
  const ret = globalShortcut.register('MediaPreviousTrack', () => {
    console.log('MediaPreviousTrack is pressed')
    exec('start ms-cortana://Reactive/?ListeningMode=True', (error, stdout, stderr) => {
      if (stdout) {
        console.log('stdout: ' + stdout)
      }
      if (stderr) {
        console.log('stderr: ' + stderr)
      }
      if (error !== null) {
        console.log('Exec error: ' + error)
      }
    })
  })

  if (ret) {
    mb.tray.setImage(ICON)
  } else {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('MediaPreviousTrack'))

  mb.app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })

})

ipcMain.on('terminate', function terminate() {
  mb.app.quit()
})