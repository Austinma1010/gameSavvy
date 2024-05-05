import * as React from "react";
import { Link } from "react-router-dom";
import { Heading, Button, ButtonGroup, Flex, Box, Spacer } from '@chakra-ui/react'

const Navbar = () => {



  return (
    <>
      <Flex minWidth='max-content' alignItems='center' gap='2' bg='black'>

        <Box p='2' bg='black' color='white' axis='both' >
          <Heading size='lg'>Game Savvy</Heading>
        </Box>

        <Spacer />

        <ButtonGroup gap='2' bg='black' p='4' color='white' axis='both'>

        <Link to='/'>
              <Button colorScheme='whatsapp' size='lg' _hover={{ bg: 'gray.400', }} >Homepage</Button>
            </Link>

            <Link to='/Signup'>
              <Button colorScheme='whatsapp' size='lg' _hover={{ bg: 'gray.400', }} >Sign-up</Button>
            </Link>

            <Link to='login'>
              <Button colorScheme='whatsapp' size='lg' _hover={{ bg: 'gray.400', }} >Login</Button>
            </Link>

            <Link to='/saves'>
              <Button colorScheme='whatsapp' size='lg'_hover={{ bg: 'gray.400', }}  >My saves</Button>
            </Link>

          </ButtonGroup>

        </Flex>
      
</>

)}; 

export default Navbar;
// export as