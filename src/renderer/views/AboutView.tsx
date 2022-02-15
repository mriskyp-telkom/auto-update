import React, { FC } from 'react'
import { BearsStates, useBearStore } from '../stores/bear'

import PageLayout from './Layout/PageLayout'

import Header from '../components/Header'

const AboutView: FC = () => {
  const bears = useBearStore((state: BearsStates) => state.bears)
  return (
    <PageLayout>
      <Header />
      About App <br />
      bears : {bears}
    </PageLayout>
  )
}

export default AboutView
