import React from 'react'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'

describe('Amount Card Component', () => {
  it('[TYPE: DEFAULT] should render properly', () => {
    const { container, getByText } = render(
      <AmountCardComponent type="default" amount={5000} />
    )
    expect(container.firstChild).toHaveClass('border-blue-700')
    expect(container.firstChild.lastChild).toHaveClass('text-blueCustom')
    expect(getByText('Rp 5.000')).toBeInTheDocument()
  })

  it('[TYPE: DISABLED] should render properly', () => {
    const { container, getByText } = render(
      <AmountCardComponent
        type="disabled"
        width={377}
        label="Total Penerimaan BOS Reguler"
        amount={100000}
      />
    )
    expect(container.firstChild).toHaveClass('border-gray-500')
    expect(container.firstChild).toHaveStyle('width: 377px')
    expect(container.firstChild.lastChild).toHaveClass('text-gray-600')
    expect(getByText('Total Penerimaan BOS Reguler')).toBeInTheDocument()
    expect(getByText('Rp 100.000')).toBeInTheDocument()
  })

  it('[TYPE: WARNING] should render properly', () => {
    const { container, getByText } = render(
      <AmountCardComponent
        type="warning"
        width={287}
        label="Sisa Dana"
        amount={300}
        class="mr-3"
      />
    )
    expect(container.firstChild).toHaveClass('border-[#d93640]')
    expect(container.firstChild).toHaveClass('mr-3')
    expect(container.firstChild).toHaveStyle('width: 287px')
    expect(container.firstChild.lastChild).toHaveClass('text-red-600')
    expect(getByText('Sisa Dana')).toBeInTheDocument()
    expect(getByText('Rp 300')).toBeInTheDocument()
  })
})
