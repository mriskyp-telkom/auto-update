import React, { FC } from 'react'
import { BearsStates, useBearStore } from '../stores/bear'

import Header from '../components/Header'

const AboutView: FC = () => {
  const bears = useBearStore((state: BearsStates) => state.bears)
  return (
    <div>
      <Header />
      About App <br />
      bears : {bears}
    </div>
  )
}

export default AboutView
