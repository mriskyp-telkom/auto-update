const ipcRenderer = window.require('electron').ipcRenderer

const syncToIpcMain = (ipc: string) => ipcRenderer.sendSync(ipc)

export default syncToIpcMain
