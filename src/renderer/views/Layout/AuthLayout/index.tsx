import React, { FC } from 'react'

import HeaderComponent from 'renderer/components/HeaderComponent'

import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FC = (props: AuthLayoutProps) => {
  return (
    <div>
      <HeaderComponent />
      <div className="grid place-content-center bg-blue-900 h-screen">
        <div className="w-[633px] mx-auto bg-default rounded-lg h-content">
          <div className="m-auto w-[393px]">
            <AuthHeader />
            {props.children}
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
