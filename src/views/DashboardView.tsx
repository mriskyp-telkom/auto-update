import React, { FC } from 'react'
import clsx from 'clsx'

import { Button } from '@wartek-id/button'
import { BearsStates, useBearStore } from '../stores/bear'

import Header from '../components/Header'

const DashboardView: FC = () => {
  const bears = useBearStore((state: BearsStates) => state.bears)
  const increasePopulation = useBearStore(
    (state: BearsStates) => state.increasePopulation
  )
  const removeAllBears = useBearStore(
    (state: BearsStates) => state.removeAllBears
  )

  return (
    <div className={clsx('text-pink-600', 'text-center')}>
      <Header />
      Home App
      <br />
      bears : {bears}
      <Button
        color="blue"
        size="md"
        variant="solid"
        onClick={increasePopulation}
      >
        Increase Bear
      </Button>
      <Button color="blue" size="md" variant="solid" onClick={removeAllBears}>
        Remove All Bear
      </Button>
    </div>
  )
}

export default DashboardView
