import React, { FC } from 'react'
import { Link } from 'react-router-dom'

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
      <Link to="/">
        <HeaderBarLeftAction icon={<LogoArkas />} />
      </Link>
      <HeaderBarTitle>ARKAS</HeaderBarTitle>
    </HeaderBar>
  )
}

export default HeaderComponent
