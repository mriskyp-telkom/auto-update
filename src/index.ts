import { app, BrowserWindow, globalShortcut } from 'electron'
import 'dotenv/config'
import path from 'path'
import { setupDB } from './setupDB'
import { connDB } from './conn'
import { machineId } from 'node-machine-id'
import { SetConfig } from './main/repositories/Config'
// import * as remoteMain from '@electron/remote/main'

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

let splashWindow: BrowserWindow, mainWindow: BrowserWindow

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}
// remoteMain.initialize()

const createWindow = (): void => {
  // Initialize electron remote
  // remoteMain.initialize()

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 1024,
    width: 1440,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(
      __dirname,
      '..',
      'renderer',
      'assets',
      'icons',
      'arkas.ico'
    ),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,

      // option
      plugins: true,
      backgroundThrottling: false,
    },
  })

  // remoteMain.enable(mainWindow.webContents)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  globalShortcut.register(
    process.platform === 'darwin' ? 'Shift+Command+I' : 'Shift+Control+I',
    function () {
      mainWindow.webContents.openDevTools()
    }
  )

  mainWindow.webContents.setUserAgent('ARKAS Agent')

  console.warn('\n\n====> This is ', process.env.ENVIRONMENT, ' env. <====\n\n')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // Create the splash window.
  splashWindow = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    show: true,
  })

  splashWindow.loadFile(path.join(__dirname, 'splash.html'))
  splashWindow.center()

  setupDB().then(() => {
    connDB().then(() => {
      machineId(true).then((id) => {
        SetConfig('hdd_vol', id)

        // will improve later
        require('./main/ipcs/ipcAnggaran')
        require('./main/ipcs/ipcConfig')
        require('./main/ipcs/ipcKK')
        require('./main/ipcs/ipcPengguna')
        require('./main/ipcs/ipcPenjab')
        require('./main/ipcs/ipcPtk')
        require('./main/ipcs/ipcRapbs')
        require('./main/ipcs/ipcReferensiBarang')
        require('./main/ipcs/ipcReferensiKode')
        require('./main/ipcs/ipcReferensiRekening')
        require('./main/ipcs/ipcReferensiSatuan')
        require('./main/ipcs/ipcReferensiWilayah')
        require('./main/ipcs/ipcSekolah')
        require('./main/ipcs/ipcTataUsaha')
        require('./main/ipcs/ipcToken')
        require('./main/ipcs/ipcUser')
        require('./main/ipcs/ipcUtils')

        setTimeout(function () {
          splashWindow.close()
          createWindow()
          mainWindow.center()
          mainWindow.show()
        }, 2000)
      })
    })
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
