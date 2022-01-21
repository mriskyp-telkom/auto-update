import React, { FC } from 'react'

import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import LoginFooter from './LoginFooter'

const LoginView: FC = () => {
  return (
    <div className="flex bg-blue-900 h-screen">
      <div className="w-[633px] mx-auto mt-[85px] bg-default rounded-lg h-content">
        <div className="m-auto w-[393px]">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>
      </div>
    </div>
  )
}

export default LoginView
