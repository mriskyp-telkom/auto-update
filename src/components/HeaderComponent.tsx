import React, { FC } from 'react'

import {
  HeaderBar,
  HeaderBarLeftAction,
  HeaderBarTitle,
} from '@wartek-id/header-bar'

const LogoArkas: FC = () => {
  return <img className="w-[32px]" src="./assets/logo-arkas.png" />
}

const HeaderComponent: FC = () => {
  return (
    <HeaderBar>
      <HeaderBarLeftAction icon={<LogoArkas />} />
      <HeaderBarTitle>ARKAS</HeaderBarTitle>
    </HeaderBar>
  )
}

export default HeaderComponent
