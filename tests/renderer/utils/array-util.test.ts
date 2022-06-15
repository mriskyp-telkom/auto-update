import { findValueDeep } from 'renderer/utils/array-util'

const errors = {
  anggaran_bulan: [
    {
      jumlah: {
        message: 'Error Jumlah Wajib Diisi',
      },
    },
  ],
  harga_satuan: {
    message: 'Error Harga Satuan Wajib Diisi',
  },
}

describe('findValueDeep', () => {
  test('With Object Empty', () => {
    const result = findValueDeep({}, 'anggaran_bulan.0.jumlah.message')
    expect(result).toMatchObject({})
  })
  test('With Object', () => {
    const result = findValueDeep(errors, 'anggaran_bulan.0.satuan')
    expect(result).toMatchObject({})
  })
  test('Find value more than 3 level', () => {
    const result = findValueDeep(errors, 'anggaran_bulan.0.jumlah.message')
    expect(result).toMatchObject({})
  })
  test('Find value in 1 level', () => {
    const result = findValueDeep(errors, 'harga_satuan')
    expect(result.message).toBe('Error Harga Satuan Wajib Diisi')
  })
  test('Find value in 2 level', () => {
    const result = findValueDeep(errors, 'anggaran_bulan.0')
    expect(result).toMatchObject({
      jumlah: { message: 'Error Jumlah Wajib Diisi' },
    })
  })
  test('Find value in 3 level', () => {
    const result = findValueDeep(errors, 'anggaran_bulan.0.jumlah')
    expect(result).toMatchObject({
      message: 'Error Jumlah Wajib Diisi',
    })
  })
})
