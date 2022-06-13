import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { err, ok, Result } from 'neverthrow'
import { GetPrintPDFPathRequest } from 'global/types/Anggaran'

export const printToPdf = async (
  request: GetPrintPDFPathRequest
): Promise<Result<string, Error>> => {
  const appName = 'printarkas.exe'
  const printAppDir = 'print'

  const executableFile = request.appDir
    ? path.join(request.appDir, appName)
    : path.join(__dirname, printAppDir, appName)

  if (
    request.template &&
    request.filename &&
    request.listIdAnggaran &&
    request.listIdAnggaran.length > 0
  ) {
    const args = []
    args.push(`/id:${request.template}`)
    args.push(`/filename:${request.filename}`)

    if (request.dbPath) {
      args.push(`/db:${request.dbPath}`)
    }

    if (request.listIdAnggaran.length == 1) {
      args.push(`/id_anggaran:${request.listIdAnggaran[0]}`)
    } else {
      for (let index = 0; index < request.listIdAnggaran.length; index++) {
        const idAnggaran = request.listIdAnggaran[index]
        args.push(`/id_anggaran${index + 1}:${idAnggaran}`)
      }
    }

    const execPromisify = promisify(execFile)

    try {
      return execPromisify(executableFile, args)
        .then((result) => {
          if (!result.stderr) {
            return ok(result.stdout.trim())
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
