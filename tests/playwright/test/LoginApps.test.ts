/* eslint-disable */
const { test, expect } = require('@playwright/test')
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers'
import jimp from 'jimp'
import { ElectronApplication, Page, _electron as electron } from 'playwright'
import { LoginPage } from '../page_object/Login.page'

let electronApp: ElectronApplication

test.beforeAll(async () => {
  // find the latest build in the out directory
  const latestBuild = findLatestBuild()
  console.log(latestBuild)

  // parse the directory and find paths and other info
  const appInfo = parseElectronApp(latestBuild)

  // set the CI environment variable to true
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    args: [appInfo.main],
    executablePath: appInfo.executable,
  })
})

test('input arkas credentials', async () => {
  electronApp.on('window', async (page) => {
    // debug only
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // fill NPSN and Activation code
    const playwrightLogin = new LoginPage(page)
    await playwrightLogin.splashScreenWait()
    await playwrightLogin.fillNSPN()
    await playwrightLogin.fillActivationCode()
    await playwrightLogin.clickDaftar()

    await expect(page.locator('.Input-module_helper__1kt7W')).toHaveText(
      'NPSN tidak terdaftar di Dapodik. Silakan periksa kembali.'
    )

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })
  await sleep(10000)
})

test.afterAll(async () => {
  await electronApp.close()
})

// Please move to helper
function sleep(m: number): Promise<unknown> {
  return new Promise((r) => setTimeout(r, m))
}
