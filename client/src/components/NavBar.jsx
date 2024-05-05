import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { Heading, Button, ButtonGroup } from '@chakra-ui/react'

import useState from '/SignupForm';
import LoginForm from '/LoginForm';

import { Button, Flex, Spacer, } from '@chakra-ui/react'

const Navbar = () => {



  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2'>

        <Box p='2'>
          <Heading size='md'>Game Savvy</Heading>
        </Box>

        <Spacer />

        <ButtonGroup gap='2'>

            <ChakraLink as={ReactRouterLink} to='/'>
              <Button colorScheme='teal' size='lg'>Signup</Button>
            </ChakraLink>

            <ChakraLink as={ReactRouterLink} to='/'>
              <Button colorScheme='teal' size='lg'>Login</Button>
            </ChakraLink>

          </ButtonGroup>

        </Flex>
      
</>

)}; 

export default Navbar