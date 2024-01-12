const { app, BrowserWindow } = require('electron/main')
const { autoUpdater } = require("electron-updater")

autoUpdater.checkForUpdatesAndNotify()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarOverlay: true,
        webPreferences: {
            nodeIntegrationInWorker: true
        }
    })
    
    win.setTitle('Instagram Direct')
    win.removeMenu()
    win.loadURL('http://instagram.com/direct')
    
    
    win.webContents.on('did-navigate-in-page', () => {
        win.webContents.insertCSS(`
        .x1xgvd2v {
            visibility: hidden !important;
        }
        `)
    
    })
    
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