import clsx from 'clsx'
import React, { FC, Fragment } from 'react'

import styles from './index.module.css'

interface StepperProps {
  step: number
  activeStep: number
  label: string[]
}

const StepperComponent: FC<StepperProps> = (props: StepperProps) => {
  return (
    <div className="flex justify-between items-center">
      {[...Array(props.step).keys()].map((stp) => {
        const isActive = props.activeStep - 1 === stp
        return (
          <Fragment key={stp}>
            <div className="flex items-center">
              <div
                className={clsx(
                  'rounded-full px-2 w-8 h-8 flex items-center justify-center',
                  isActive
                    ? 'bg-blue-900 text-white border-2 border-blue-900'
                    : 'text-gray-80 border-2'
                )}
              >
                {stp + 1}
              </div>
              <div className={clsx(isActive && 'font-bold', ' ml-2')}>
                {props.label[stp]}
              </div>
            </div>
            {stp < props.step - 1 && <div className={styles.divider}></div>}
          </Fragment>
        )
      })}
    </div>
  )
}

export default StepperComponent
