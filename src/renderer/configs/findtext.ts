const remote = window.require('@electron/remote')
const FindInPage = window.require('electron-find').FindInPage
const ipcRenderer = window.require('electron').ipcRenderer

export const openFindText = () => remote.getCurrentWebContents().send('on-find')

export const initializeFindText = (element?: string) => {
  const findInPage = new FindInPage(remote.getCurrentWebContents(), {
    parentElement: document.getElementById(element),
  })

  ipcRenderer.on('on-find', () => {
    findInPage.openFindWindow()
  })
}
