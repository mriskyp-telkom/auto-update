import { printToPdf } from 'main/services/PrintService'
import path from 'path'

test('PrintToPdf_DefaultOutputDir', async () => {
  const filename = 'rapbs-tri-2022-output'
  const result = await printToPdf(
    'rapbs-tri-2022',
    filename,
    ['nee1i6EqD0S04MZqg-GhtQ'],
    path.join(__dirname, '../../../print/app')
  )
  const filenameOutput = result.unwrapOr(<string>{})

  expect(result.isErr()).toBe(false)
  expect(filenameOutput.includes(filename)).toBe(true)
})

test('PrintToPdf_CustomOutputDir', async () => {
  const filename = 'E:\\arkas4\\pdf\\rapbs-tri-2022-output'
  const result = await printToPdf(
    'rapbs-tri-2022',
    filename,
    ['nee1i6EqD0S04MZqg-GhtQ'],
    path.join(__dirname, '../../../print/app')
  )
  const filenameOutput = result.unwrapOr(<string>{})

  expect(result.isErr()).toBe(false)
  expect(filenameOutput.includes(filename)).toBe(true)
})
