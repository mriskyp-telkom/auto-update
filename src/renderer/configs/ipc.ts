const ipcRenderer = window.require('electron').ipcRenderer

const syncToIpcMain = (ipc: string, params?: any) =>
  ipcRenderer.sendSync(ipc, params)

export default syncToIpcMain
