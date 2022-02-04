import React, { FC } from 'react'

import SidebarComponent from 'components/SidebarComponent'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: FC = (props: PageLayoutProps) => {
  return (
    <div className="flex">
      <SidebarComponent />
      <div>{props.children}</div>
    </div>
  )
}

export default PageLayout
