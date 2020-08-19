import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/core'

export const Footer = ({ bg }) => (
  <Box bg={bg} as="footer" borderTop="1px solid #EDF2F7" color="gray.600">
    <Box margin="0 auto" p={6}>
      <Flex width="100%" direction={['column', 'row']} justify="space-around">
        <Box maxWidth="100%">
          <Text fontWeight="700" color="gray.500">
            DashboardOI
          </Text>
          <Text fontFamily="heading">
            Welcome to DashboardOI, Checklist for (almost) all OI problems
          </Text>

          <Box mt={2} display={['none', 'block']}>
            <Text fontSize="xs">
              © 2020-{new Date().getFullYear()} PeppaPigHS
            </Text>
            <Text fontSize="xs">
              The source code for this website is available on{' '}
              <Link
                href="https://github.com/PeppaPigHS/dashboard-oi"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>

      <Box fontSize="xs" textAlign="center" mt={4}>
        <Box mt={2} display={['block', 'none']}>
          <Text fontSize="xs">
            © 2020-{new Date().getFullYear()} PeppaPigHS
          </Text>
          <Text fontSize="xs">
            The source code for this website is available on{' '}
            <Link
              href="https://github.com/PeppaPigHS/dashboard-oi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Text>
        </Box>
        <Box mt={[2, 0]}>
          <Text>Made with ⚡ by PeppaPigHS</Text>
        </Box>
      </Box>
    </Box>
  </Box>
)
