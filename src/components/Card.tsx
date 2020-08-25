import React from 'react'

import { ITask } from '../@types/task'

import {
  Box,
  PseudoBox,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/core'

export const Card = ({ task }) => {
  return (
    <Box>
      <PseudoBox
        transition="0.3s"
        _hover={{ boxShadow: 'md' }}
        p={4}
        backgroundColor={task.color}
      >
        <Flex direction="row" justify="space-between">
          <Link href={task.link} target="__blank">
            {task.name}
          </Link>
          <Menu>
            <MenuButton
              as={IconButton}
              //@ts-ignore
              icon="chevron-down"
              aria-label="drop-down"
              size="sm"
              ml={4}
            />
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </PseudoBox>
    </Box>
  )
}
