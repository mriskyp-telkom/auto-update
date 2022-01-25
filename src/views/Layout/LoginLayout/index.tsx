import React, { FC } from 'react'

import LoginHeader from './LoginHeader'
import LoginFooter from './LoginFooter'

interface LoginLayoutProps {
  children: React.ReactNode
}

const LoginLayout: FC = (props: LoginLayoutProps) => {
  return (
    <div className="flex bg-blue-900 h-screen">
      <div className="w-[633px] mx-auto mt-[85px] bg-default rounded-lg h-content">
        <div className="m-auto w-[393px]">
          <LoginHeader />
          {props.children}
          <LoginFooter />
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
