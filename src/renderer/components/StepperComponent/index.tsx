import clsx from 'clsx'
import React, { FC, Fragment } from 'react'

import styles from './index.module.css'

interface StepperProps {
  activeStep: number
  label: string[]
}

const StepperComponent: FC<StepperProps> = (props: StepperProps) => {
  const totalSteps = props.label.length

  return (
    <div className="flex justify-between items-center">
      {props.label.map((step, index) => {
        const isActive = props.activeStep - 1 === index
        return (
          <Fragment key={step}>
            <div className="flex items-center">
              <div
                className={clsx(
                  'rounded-full px-2 w-8 h-8 flex items-center justify-center',
                  isActive
                    ? 'bg-blue-900 text-white border-2 border-blue-900'
                    : 'text-gray-80 border-2'
                )}
              >
                {index + 1}
              </div>
              <div className={clsx(isActive && 'font-bold', ' ml-2')}>
                {step}
              </div>
            </div>
            {index < totalSteps - 1 && <div className={styles.divider}></div>}
          </Fragment>
        )
      })}
    </div>
  )
}

export default StepperComponent
