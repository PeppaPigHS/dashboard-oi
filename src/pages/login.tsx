import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Flex, Text, Box, Link as ChakraLink } from '@chakra-ui/core'

import { OAuthLogin } from 'components/auth/OAuthLogin'
import { useUser } from 'components/UserContext'

export const Login = () => {
  const [error, setError] = useState<string>(' ')

  const { user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (user.user !== null) {
      router.push('/')
    }
  }, [user.user])

  return (
    <Flex align="center" justify="center" flexGrow={1} flexDirection="column">
      <Text fontSize={['4xl', '5xl']} mb={4}>
        Log in
      </Text>
      <Box w="360px" maxW="90%">
        <OAuthLogin setErrorMessage={setError} />
      </Box>
      <Text color="red.500" mt={2}>
        {error}
      </Text>
    </Flex>
  )
}

export default Login
