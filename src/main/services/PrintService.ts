import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { err, ok, Result } from 'neverthrow'

export const printToPdf = async (
  template: string,
  filename: string,
  arrayOfIdAnggaran: string[],
  appDir?: string,
  dbPath?: string
): Promise<Result<string, Error>> => {
  const appName = 'printarkas.exe'
  const printAppDir = 'print'

  const executableFile = appDir
    ? path.join(appDir, appName)
    : path.join(__dirname, printAppDir, appName)

  if (
    template &&
    filename &&
    arrayOfIdAnggaran &&
    arrayOfIdAnggaran.length > 0
  ) {
    const args = []
    args.push(`/id:${template}`)
    args.push(`/filename:${filename}`)

    if (dbPath) {
      args.push(`/db:${dbPath}`)
    }

    if (arrayOfIdAnggaran.length == 1) {
      args.push(`/id_anggaran:${arrayOfIdAnggaran[0]}`)
    } else {
      for (let index = 0; index < arrayOfIdAnggaran.length; index++) {
        const idAnggaran = arrayOfIdAnggaran[index]
        args.push(`/id_anggaran${index + 1}:${idAnggaran}`)
      }
    }

    const execPromisify = promisify(execFile)

    try {
      return execPromisify(executableFile, args)
        .then((result) => {
          if (!result.stderr) {
            return ok(result.stdout)
          } else {
            return err(new Error(result.stderr))
          }
        })
        .catch((err) => {
          throw err
        })
    } catch (error) {
      return err(new Error(error))
    }
  }
}
