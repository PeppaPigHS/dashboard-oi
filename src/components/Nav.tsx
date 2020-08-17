import React, { useState } from 'react'
import { useWindowSize } from 'react-use'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/core'
import { FiMenu, FiX } from 'react-icons/fi'

interface IMenu {
  key: string
  name: string
  path: string
}

const leftMenu: IMenu[] = [
  { key: 'home', name: 'Home', path: '/' },
  { key: 'checklist', name: 'Checklist', path: '/checklist' },
]

const generateMenuItems = (menu: IMenu[], pathname: string) => {
  const location = pathname.split('/')[1]

  return menu.map((i) => (
    <Link href={i.path} key={i.key}>
      <ChakraLink
        href={i.path}
        mt={[4, 0]}
        ml={[0, 8]}
        lineHeight="18px"
        color={`/${location}` === i.path ? 'gray.800' : 'gray.500'}
      >
        {i.name}
      </ChakraLink>
    </Link>
  ))
}

export const Nav = () => {
  const [isNavOpen, setNavState] = useState(false)
  const { width } = useWindowSize()

  const router = useRouter()

  return (
    <Box as="header">
      <Box
        margin="0 auto"
        maxWidth={['100%', '480px', '700px', '768px', '1024px']}
        py={4}
      >
        <Flex
          px={6}
          direction="row"
          justify="space-between"
          align="center"
          display={['flex', 'none']}
        >
          <Text fontWeight="700" color="black">
            DashboardOI
          </Text>

          {isNavOpen ? (
            <Box as={FiX} onClick={() => setNavState(false)} size={6} />
          ) : (
            <Box as={FiMenu} onClick={() => setNavState(true)} size={6} />
          )}
        </Flex>

        {(isNavOpen || width > 480) && (
          <Flex
            as="nav"
            pr={[6, 0, 0, 0, 0]}
            direction={['column', 'row', 'row']}
            justify={['', 'space-between']}
            align={['flex-end', '']}
            fontWeight="500"
          >
            <Flex
              align={['flex-end', 'baseline']}
              justify="flex-end"
              direction={['column', 'row']}
              textAlign={['end', 'unset']}
            >
              <Text fontWeight="700" color="black" display={['none', 'unset']}>
                DashboardOI
              </Text>

              {generateMenuItems(leftMenu, router.pathname)}
            </Flex>

            <Box></Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
