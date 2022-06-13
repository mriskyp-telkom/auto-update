import { GetPrintPDFPathRequest } from 'global/types/Anggaran'
import { printToPdf } from 'main/services/PrintService'
import path from 'path'

test('PrintToPdf_DefaultOutputDir', async () => {
  const filename = 'rapbs-tri-2022-output'
  const request = <GetPrintPDFPathRequest>{
    template: 'rapbs-tri-2022',
    filename: filename,
    listIdAnggaran: ['nee1i6EqD0S04MZqg-GhtQ'],
    appDir: path.join(__dirname, '../../../print/app'),
  }
  const result = await printToPdf(request)
  const filenameOutput = result.unwrapOr(<string>{})

  expect(result.isErr()).toBe(false)
  expect(filenameOutput.includes(filename)).toBe(true)
})

test('PrintToPdf_CustomOutputDir', async () => {
  const filename = 'E:\\arkas4\\pdf\\rapbs-tri-2022-output'
  const request = <GetPrintPDFPathRequest>{
    template: 'rapbs-tri-2022',
    filename: filename,
    listIdAnggaran: ['nee1i6EqD0S04MZqg-GhtQ'],
    appDir: path.join(__dirname, '../../../print/app'),
  }

  const result = await printToPdf(request)
  const filenameOutput = result.unwrapOr(<string>{})

  expect(result.isErr()).toBe(false)
  expect(filenameOutput.includes(filename)).toBe(true)
})
