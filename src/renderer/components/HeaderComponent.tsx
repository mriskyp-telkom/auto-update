import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import MenuProfileComponent from './MenuProfileComponent'

import {
  HeaderBar,
  HeaderBarLeftAction,
  HeaderBarRightAction,
  HeaderBarTitle,
} from '@wartek-id/header-bar'

const LogoArkas: FC = () => {
  return <img className="w-[32px]" src="./assets/logo-arkas.png" />
}

const HeaderComponent: FC = () => {
  return (
    <HeaderBar className="max-w-none w-full">
      <Link to="/">
        <HeaderBarLeftAction icon={<LogoArkas />} />
      </Link>
      <HeaderBarTitle>ARKAS</HeaderBarTitle>
      <HeaderBarRightAction className="flex-grow justify-end">
        <MenuProfileComponent />
      </HeaderBarRightAction>
    </HeaderBar>
  )
}

export default HeaderComponent
