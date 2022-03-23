const ipcRenderer = window.require('electron').ipcRenderer

const syncToIpcMain = (ipc: string, param1?: any) =>
  ipcRenderer.sendSync(ipc, param1)

export default syncToIpcMain
