import React from 'react'

import { Flex, Spinner, Text } from '@chakra-ui/core'

export const Loading = () => {
  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <Text mb={4} color="teal.500" fontSize={['3xl', '6xl']}>
        DashboardOI
      </Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  )
}
