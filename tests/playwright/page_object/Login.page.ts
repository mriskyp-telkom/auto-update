import { Locator, Page } from '@playwright/test'
import 'dotenv/config'

export class LoginPage {
  readonly page: Page
  readonly elementNPSN: Locator
  readonly activationCode: Locator
  readonly daftarButton: Locator

  constructor(page: Page) {
    this.page = page
    this.elementNPSN = page.locator('#npsn')
    this.activationCode = page.locator('#activation_code')
    this.daftarButton = page.locator('button:has-text("Daftar")')
  }

  async splashScreenWait() {
    await this.elementNPSN
  }

  async fillNSPN() {
    await this.elementNPSN.type(process.env.NSPN_NUMBER)
    await this.elementNPSN.press('Enter')
  }

  async fillActivationCode() {
    await this.activationCode.click()
    await this.activationCode.type(process.env.ACTIVATION_CODE)
  }

  async clickDaftar() {
    await this.daftarButton.click()
  }
}
