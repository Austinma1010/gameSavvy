import * as React from "react";
import { Link } from "react-router-dom";
import { Heading, Button, ButtonGroup, Flex, Box, Spacer  } from '@chakra-ui/react'

const Navbar = () => {



  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2'>

        <Box p='2'>
          <Heading size='md'>Game Savvy</Heading>
        </Box>

        <Spacer />

        <ButtonGroup gap='2'>

        <Link to='/'>
              <Button colorScheme='teal' size='lg'>Homepage</Button>
            </Link>

            <Link to='/Signup'>
              <Button colorScheme='teal' size='lg'>Sign-up</Button>
            </Link>

            <Link to='login'>
              <Button colorScheme='teal' size='lg'>Login</Button>
            </Link>

            <Link to='/saves'>
              <Button colorScheme='teal' size='lg'>My saves</Button>
            </Link>

          </ButtonGroup>

        </Flex>
      
</>

)}; 

export default Navbar;
// export as