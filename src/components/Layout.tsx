import React from 'react'

import { Flex, Divider } from '@chakra-ui/core'

import { Nav } from 'components/Nav'
import { Footer } from 'components/Footer'
import { useUser } from 'components/UserContext'

interface IPageLayoutProps {
  hideNav?: boolean
  bg?: string
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  const { user } = useUser()

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      bg={props.bg}
      display={user.user === undefined ? 'none' : 'flex'}
    >
      <Nav></Nav>
      <Divider m={0}></Divider>
      <Flex as="main" flex="auto" direction="column" minH="calc(100vh - 56px)">
        {props.children}
      </Flex>
      <Footer bg={props.bg} />
    </Flex>
  )
}

PageLayout.defaultProps = {
  hideNav: false,
}
