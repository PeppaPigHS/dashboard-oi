import React, { useState } from 'react'
import { useWindowSize } from 'react-use'

import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
} from '@chakra-ui/core'
import { FiMenu, FiX } from 'react-icons/fi'

import firebase from 'lib/firebase'

import { useUser } from 'components/UserContext'

interface IMenu {
  key: string
  name: string
  path: string
}

const leftMenu: IMenu[] = [
  { key: 'home', name: 'Home', path: '/' },
  { key: 'checklist', name: 'Checklist', path: '/checklist' },
]

const rightMenu: IMenu[] = [
  { key: 'signup', name: 'Sign Up', path: '/signup' },
  { key: 'login', name: 'Login', path: '/login' },
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

  const { user, loading, userDispatch } = useUser()

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

            <Box>
              {(user.user !== null && loading === true) ||
              user.user === undefined ? (
                <Flex
                  mt={[4, 0]}
                  align={['flex-end', 'baseline']}
                  direction={['column', 'row']}
                >
                  Loading...
                </Flex>
              ) : user.user !== null ? (
                <Menu>
                  <MenuButton as={Box}>
                    <Stack isInline mt={[4, 0]}>
                      <Text color="gray.500">
                        Welcome, {user.username || user.user.displayName}
                      </Text>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem onClick={() => router.push('/setusername')}>
                      Change Username
                    </MenuItem>
                    <MenuDivider></MenuDivider>
                    <MenuItem
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            userDispatch({
                              type: 'LOADING_START',
                            })
                          })
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Flex
                  mt={[4, 0]}
                  align={['flex-end', 'baseline']}
                  direction={['column', 'row']}
                >
                  {generateMenuItems(rightMenu, router.pathname)}
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
