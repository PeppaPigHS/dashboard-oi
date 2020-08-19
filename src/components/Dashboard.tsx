import React from 'react'
import Link from 'next/link'

import { Flex, Text, Button, Box, Divider } from '@chakra-ui/core'
import { FaArrowRight, FaGithub } from 'react-icons/fa'

import { useUser } from 'components/UserContext'

export const Dashboard = () => {
  const { user } = useUser()

  return (
    <Flex flexGrow={1} direction="column" justify="center">
      <Box w="full" pb="12" pt="3" mx="auto" maxW="1024px" px={6}>
        <Box maxW="760px" mx="auto" textAlign="center">
          <Text
            fontSize={{ base: '2.25rem', md: '3rem', lg: '3.75rem' }}
            letterSpacing="tight"
            mb="16px"
            lineHeight="1.2"
          >
            Checklist built for
            <br />
            <Box as="span" color="teal.500">
              {' '}
              competitive programming enthusiasts
            </Box>
          </Text>

          <Text opacity={0.7} fontSize={{ base: 'lg', lg: 'xl' }} mt="6">
            DashboardOI is a checklist for keep tracking your progress on
            solving OI problems
          </Text>

          <Divider></Divider>

          <Flex mt={10} justify="center" direction={['column', 'row']}>
            <Link href={user.user ? '/checklist' : '/login'}>
              <a>
                <Button
                  h={12}
                  mr={[0, 4]}
                  mb={[4, 0]}
                  px={10}
                  fontSize="1.2rem"
                  variantColor="teal"
                  leftIcon={FaArrowRight}
                >
                  Get Started
                </Button>
              </a>
            </Link>
            <a
              href="https://github.com/PeppaPigHS/dashboard-oi"
              target="__blank"
            >
              <Button h={12} px={10} fontSize="1.2rem" leftIcon={FaGithub}>
                GitHub
              </Button>
            </a>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
