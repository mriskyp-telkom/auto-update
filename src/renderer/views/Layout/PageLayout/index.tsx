import React, { FC } from 'react'

import SidebarComponent from 'renderer/components/SidebarComponent'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: FC = (props: PageLayoutProps) => {
  return (
    <div className="flex bg-gray-0">
      <SidebarComponent />
      <div className="w-full">{props.children}</div>
    </div>
  )
}

export default PageLayout
