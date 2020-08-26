import React from 'react'

import { Nav } from 'components/Nav'
import { Footer } from 'components/Footer'
import { useUser } from 'components/UserContext'

interface IPageLayoutProps {
  page: string
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Nav page={props.page} />
        <main className="flex flex-auto flex-col">{props.children}</main>
      </div>
      <Footer />
    </div>
  )
}
