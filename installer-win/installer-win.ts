import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'

export const InstallerWin = (): void => {
  if (process.platform == 'win32') {
    const paramStr = path.join(__dirname, 'arkas.4.00.iss')
    const execPromisify = promisify(execFile)
    execPromisify(path.join(__dirname, 'inno', 'ISCC.exe'), [paramStr])
  }
}

InstallerWin()
