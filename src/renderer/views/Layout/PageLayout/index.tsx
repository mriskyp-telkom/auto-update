import React, { FC } from 'react'

import HeaderComponent from 'renderer/components/HeaderComponent'
import SidebarComponent from 'renderer/components/SidebarComponent'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: FC = (props: PageLayoutProps) => {
  return (
    <div>
      <HeaderComponent />
      <div className="flex bg-gray-0">
        <SidebarComponent />
        <div className="flex-grow">{props.children}</div>
      </div>
    </div>
  )
}

export default PageLayout
