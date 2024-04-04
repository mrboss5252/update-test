const { app, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require("electron-updater")
// const is_dev = require("electron-is-dev")
const path = require('path')
const log = require("electron-log")

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

autoUpdater.setFeedURL({
  provider:"github",
  owner:"mrboss5252",
  repo:"update-test",
  private:false
})

let win
function createWindow () {
    win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation:false},
      width: 800,
      height: 600,
      minHeight:600,
      minWidth:500,
      frame: false
    })
  
    win.loadURL("http://localhost:3000/"
    )
    autoUpdater.checkForUpdates()
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
    app.quit()
    }
})

autoUpdater.on("checking-for-update", ()=> {
    console.log("app is under checking")
    dialog.showMessageBox({
      type:"info",
      buttons:["ok"],
      title:"checking for update",
      detail:"checking the update if available you will notice!",
    },(res)=> {})
  })
  

autoUpdater.on("error", (err) => {
    console.error("Error while checking for updates:", err);
    dialog.showMessageBox({
      type:"info",
      buttons:["ok"],
      title:"error while updating",
      detail:"an error found during the updating"
    },(res)=> {})
});

autoUpdater.on("update-not-available",()=> {
  dialog.showMessageBox({
    type:"info",
    buttons:["ok"],
    title:"update not available"
  },(res)=> {})
})

autoUpdater.on("update-available", (event,releaseNotes, releaseName)=> {
  dialog.showMessageBox({
    type:"info",
    buttons:["ok"],
    title:"application update available"
  },(res)=> {})
})