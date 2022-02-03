import React, { FC } from 'react'

import PageLayout from 'views/Layout/PageLayout'

import Header from 'components/Header'

import { Button } from '@wartek-id/button'

import { BearsStates, useBearStore } from 'stores/bear'

const DashboardView: FC = () => {
  const bears = useBearStore((state: BearsStates) => state.bears)
  const increasePopulation = useBearStore(
    (state: BearsStates) => state.increasePopulation
  )
  const removeAllBears = useBearStore(
    (state: BearsStates) => state.removeAllBears
  )

  return (
    <PageLayout>
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
    </PageLayout>
  )
}

export default DashboardView
