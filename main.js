const { app, globalShortcut } = require('electron')
// const hook = require('ll-keyboard-hook-win');// "ll-keyboard-hook-win": "^3.0.0", 
// const ks = require('node-key-sender');//"node-key-sender": "1.0.9"
const exec = require('child_process').exec

app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('MediaPreviousTrack', () => {
    console.log('MediaPreviousTrack is pressed')
    // ks.sendCombination(["windows", "c"]);
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
  // hook.on('down', 'MediaPreviousTrack', () => {
  //   console.log('MediaPreviousTrack is pressde with hock')
  // })
  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('MediaPreviousTrack'))
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
  // hock.unbind()
})
