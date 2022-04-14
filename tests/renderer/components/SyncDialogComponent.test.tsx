import React from 'react'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

describe('Sync Dialog Component', () => {
  it('it should render properly', () => {
    const handleClose = jest.fn()

    const { getByText } = render(
      <SyncDialogComponent
        title="Sinkronisasi Data..."
        percentage={0}
        isOpen={true}
        setIsOpen={handleClose}
      />
    )

    expect(getByText('Sinkronisasi Data...')).toBeInTheDocument()
    expect(
      getByText('Pastikan Anda terkoneksi ke internet yang lancar.')
    ).toBeInTheDocument()
  })

  it('it should render properly', () => {
    const handleClose = jest.fn()

    const { getByText } = render(
      <SyncDialogComponent
        title="Menyalin RKAS..."
        subtitle="Mohon tunggu sebentar."
        percentage={50}
        isOpen={true}
        setIsOpen={handleClose}
      />
    )

    expect(getByText('Menyalin RKAS...')).toBeInTheDocument()
    expect(getByText('Mohon tunggu sebentar.')).toBeInTheDocument()
  })
})
