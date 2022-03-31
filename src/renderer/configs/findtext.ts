// const remote = window.require('@electron/remote')
// const FindInPage = window.require('electron-find').FindInPage
// const ipcRenderer = window.require('electron').ipcRenderer

// export const openFindText = () =>
//   remote.getCurrentWebContents().send('open-find')

// export const closeFindText = () =>
//   remote.getCurrentWebContents().send('close-find')

// export const initializeFindText = (element?: string) => {
//   const findInPage = new FindInPage(remote.getCurrentWebContents(), {
//     parentElement: document.getElementById(element),
//     inputFocusColor: '#808489',
//   })

//   ipcRenderer.on('open-find', () => {
//     findInPage.openFindWindow()
//   })

//   ipcRenderer.on('close-find', () => {
//     findInPage.closeFindWindow()
//   })
// }
