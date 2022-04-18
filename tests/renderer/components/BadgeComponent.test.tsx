import React from 'react'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import BadgeComponent from 'renderer/components/BadgeComponent'

describe('Badge Component', () => {
  it('it should render properly', () => {
    const { getByText } = render(
      <BadgeComponent type="success" label="Sudah Selesai" />
    )

    expect(getByText('Sudah Selesai')).toBeInTheDocument()
  })

  it('[TYPE DISABLED] it should render properly', () => {
    const { container, getByText } = render(
      <BadgeComponent type="disabled" label="Non Aktif - Lewat Batas" />
    )

    expect(container.firstChild).toHaveClass('bg-gray-200')
    expect(getByText('Non Aktif - Lewat Batas')).toBeInTheDocument()
  })
})
