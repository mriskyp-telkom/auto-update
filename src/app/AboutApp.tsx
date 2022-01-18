import React, { FC } from 'react'
import { BearsStates, useBearStore } from '../stores/bear'

const AboutApp: FC = () => {
  const bears = useBearStore((state: BearsStates) => state.bears)
  return (
    <div>
      About App <br />
      bears : {bears}
    </div>
  )
}

export default AboutApp
