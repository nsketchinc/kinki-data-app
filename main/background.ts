import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import createWindow from './create-window'

const isProd: boolean = process.env.NODE_ENV === 'production'
let window: BrowserWindow

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const x = 0
  const y = 0
  // const width = 960/
  const width = 1440
  // const height = 540
  const height = 860

  const mainWindow = createWindow('main', {
    width: width,
    height: height,
    // frame: false,
    // transparent: true,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
  }
    // mainWindow.webContents.openDevTools()

    // SET HERE FOR PRODUCTION -> SHOWS TO EXTENDED DISPLAY ALWWAYS
    // mainWindow.setBounds({ x: 1920, y: 0, width: 1920 * 2, height: 1080 + 1 })
  mainWindow.setBounds({ x: x, y: y, width: width, height: height })
})()

const desktop_path = app.getPath('desktop')
console.log(desktop_path)

const store = new Store({
  name: 'messages',
  // cwd: process.cwd(),
  cwd: desktop_path
})

// ===============================================
// json
// -----------------------------------------------

// jsonにノードデータを追加
ipcMain.handle('save-json', (event, arg) => {
  console.log(arg)
  // jsonにセット
  store.set('node', arg)

  return true
})

// 現在のjsonを取得
ipcMain.handle('get-json', (event, arg) => {
  const nodes = (store.get('node') as any) || []
  return nodes
})

// ===============================================
// electron
// -----------------------------------------------

ipcMain.handle(
  'open-dialog',
  async (_e: Electron.IpcMainInvokeEvent, _arg: any) => {
    return new Promise((resolve, reject) => {
      dialog
        .showOpenDialog(window, {
          title: 'Select file',
          properties: ['openFile'],
        })
        .then(({ filePaths: paths }) => {
          if (paths) {
            resolve(paths[0])
          } else {
            reject()
          }
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }
)

app.on('window-all-closed', () => {
  app.quit()
})
