import React, { FC } from 'react'

import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: FC = (props: AuthLayoutProps) => {
  return (
    <div className="flex bg-blue-900 h-full">
      <div className="w-[633px] mx-auto mt-[85px] bg-default rounded-lg h-content">
        <div className="m-auto w-[393px]">
          <AuthHeader />
          {props.children}
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
