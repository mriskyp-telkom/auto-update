/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import 'dotenv/config'

import { exec } from 'child_process'

export class ShellIntercation {
  async shellExec(command: string) {
    exec(command, (error: { message: any }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`) // eslint-disable-line no-console
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`) // eslint-disable-line no-console
        return
      }
      console.log(`stdout: ${stdout}`) // eslint-disable-line no-console
    })
  }
}
