import React from 'react'

import { Flex } from '@chakra-ui/core'

import { Table } from 'components/Table'

const Checklist = () => {
  return (
    <Flex direction="column" px={20} py={4} overflow="auto">
      <Table />
    </Flex>
  )
}

export default Checklist
