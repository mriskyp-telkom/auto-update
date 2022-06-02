/* eslint-disable */
const { test, expect } = require('@playwright/test')

// add helper
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers'

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
    executablePath: appInfo.executable,
  })
})

test('input arkas credentials', async () => {
  electronApp.on('window', async (page) => {
    // debug only
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // fill NPSN and Activation code
    const elementNPSN = await page.$('#npsn')
    await elementNPSN.type(process.env.NSPN_NUMBER)
    await elementNPSN.press('Enter')
    // or :
    // await page.click("#npsn")
    // await page.fill('#npsn', '88888888');

    await page.click('#activation_code')
    await page.fill('#activation_code', 'loremIpsum')

    await page.click('text=Daftar')

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
