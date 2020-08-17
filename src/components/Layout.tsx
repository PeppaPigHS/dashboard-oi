import React from 'react'

import { Flex, Divider } from '@chakra-ui/core'
import { Nav } from './Nav'

interface IPageLayoutProps {
  hideNav?: boolean
  bg?: string
  children: React.ReactNode
}

export const PageLayout: React.FunctionComponent<IPageLayoutProps> = (
  props: IPageLayoutProps
) => {
  return (
    <Flex direction="column" minHeight="100vh" bg={props.bg}>
      <Nav></Nav>
      <Divider m={0}></Divider>
      <Flex as="main" flex="auto" direction="column" minH="calc(100vh - 56px)">
        {props.children}
      </Flex>
    </Flex>
  )
}

PageLayout.defaultProps = {
  hideNav: false,
}
