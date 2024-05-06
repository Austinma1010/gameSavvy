import * as React from "react";
import { Link } from "react-router-dom";
import { Heading, Button, ButtonGroup, Flex, Box, Spacer, Text, Image} from '@chakra-ui/react'

const Navbar = () => {



  return (
    <>
      <Flex gap='1' bg='black' >

        <Box p='4' bg='black' color='white' axis='both' >
          <Heading as='h2' size='2xl'  bgGradient='linear(to-l, #FFFFFF, RGBA(255, 255, 255, 0.48) )' bgClip='text' fontSize='6xl' fontWeight='medium-light'>Game Savvy</Heading>
          <Heading m='4' size='lg' fontWeight='light' >Search for Games!</Heading>
          
        </Box>

        <Spacer />

        <Box p='4' bg='black' color='white' axis='both' >

          <ButtonGroup gap='2' bg='black' p='2' m='7' color='white' axis='both'>

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
        </Box>

        </Flex>
      
</>

)}; 

export default Navbar;
// export as