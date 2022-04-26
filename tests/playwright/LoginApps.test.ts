/* eslint-disable */
const { test, expect } = require('@playwright/test');

// add helper
import { 
  clickMenuItemById, 
  findLatestBuild, 
  ipcMainCallFirstListener, 
  ipcRendererCallFirstListener, 
  parseElectronApp,
} from 'electron-playwright-helpers'

import jimp from 'jimp'
import { ElectronApplication, Page, _electron as electron } from 'playwright'

let electronApp: ElectronApplication
// end of helper

test.beforeAll(async () => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild()
  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild)
  // set the CI environment variable to true
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable
  })
  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })

})

test.afterAll(async () => {
  await electronApp.close()
})

let page: Page

function sleep(m: number): Promise<unknown> {
    return new Promise(r => setTimeout(r, m));
}

test('renders the first page', async () => {
  page = await electronApp.firstWindow()

  page.on('console', console.log);

  const filename = page.url()?.split('/').pop()
  console.log(`Window opened: ${filename}`)
  await sleep(3000)

  const windowState: {
    isVisible: boolean;
    isDevToolsOpened: boolean;
    isCrashed: boolean;
  } = await electronApp.evaluate(async ({ BrowserWindow }) => {
    const mainWindow = BrowserWindow.getAllWindows()[0];

    const getState = () => ({
      isVisible: mainWindow.isVisible(),
      isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
      isCrashed: mainWindow.webContents.isCrashed(),
    });

    return new Promise((resolve) => {
      if (mainWindow.isVisible()) {
        resolve(getState());
      } else {
        mainWindow.once("ready-to-show", () =>
          setTimeout(() => resolve(getState()), 0)
        );
      }
    });
  });

  expect(windowState.isVisible).toBeTruthy();
  expect(windowState.isDevToolsOpened).toBeFalsy();
  expect(windowState.isCrashed).toBeFalsy();

  // still not able to interact with UI. #todo
  const button = await page.$('npsn');
  await button.click();
})
