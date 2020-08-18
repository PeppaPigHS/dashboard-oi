import React, { useState } from 'react'

import { Flex, Text, Box, Link as ChakraLink } from '@chakra-ui/core'

import { OAuthLogin } from 'components/auth/OAuthLogin'

export const Login = () => {
  const [error, setError] = useState<string>(' ')

  return (
    <Flex align="center" justify="center" flexGrow={1} flexDirection="column">
      <Text />
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
