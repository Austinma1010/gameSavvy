import * as React from "react";
import { Link } from "react-router-dom";
import { Heading, Button, ButtonGroup } from '@chakra-ui/react'

import Signup from '../SignupForm';
import  Login from '../LoginForm';

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

            <Link to='/Signup'>
              <Button colorScheme='teal' size='lg'>Sign-up</Button>
            </Link>

            <Link to='login'>
              <Button colorScheme='teal' size='lg'>Login</Button>
            </Link>

          </ButtonGroup>

        </Flex>
      
</>

)}; 

export default Navbar;
