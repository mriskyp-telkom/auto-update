import React, { FC, useEffect, useState } from 'react'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { initializeFindText, openFindText } from 'renderer/configs/findtext'

import clsx from 'clsx'

const ButtonCariComponent: FC = () => {
  const [showBtnCari, setShowBtnCari] = useState(true)

  const handleCari = () => {
    openFindText()
    setShowBtnCari(false)
  }

  const handleClose = (event: any) => {
    if (event.target.className.includes('find-close')) {
      setShowBtnCari(true)
    }
  }

  useEffect(() => {
    initializeFindText('inputCari')
  }, [])

  useEffect(() => {
    document
      .getElementById('inputCari')
      .addEventListener('click', handleClose, true)
    return () => {
      document
        .getElementById('inputCari')
        .removeEventListener('click', handleClose, true)
    }
  })

  return (
    <div className="flex">
      <span
        id="inputCari"
        className={clsx(showBtnCari && 'hidden', 'mr-3')}
      ></span>
      {showBtnCari && (
        <Button
          color="white"
          size="md"
          variant="solid"
          className="mr-3"
          onClick={handleCari}
        >
          <Icon
            as="i"
            color="default"
            fontSize="small"
            className="mr-1"
            style={{ fontSize: '18px', color: '#45474a' }}
          >
            search
          </Icon>
          Cari
        </Button>
      )}
    </div>
  )
}

export default ButtonCariComponent
