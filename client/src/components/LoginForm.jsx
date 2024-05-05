
import { useState } from 'react';

import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue, } from '@chakra-ui/react';
// import chakra ui elements 

import { useQuery, useMutation,  } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// import login mutations 

import Auth from '../utils/auth';


export default function LoginForm() {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUserMutation, { loading, error }] = useMutation(LOGIN_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    
    

    try {
      console.log(userFormData);
      const {email, password} = userFormData;
      const { data } = await loginUserMutation({
        variables: {email, password},
      });

    
console.log(data);
      const { token, user } = data;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email"
              onChange={handleInputChange}
              id="email"
              name="email"
              value={userFormData.email}
               />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input 
              type="password"
              onChange={handleInputChange} 
              id="password"
              name="password"
              value={userFormData.password}
               />
            </FormControl>
            <Stack spacing={10}>
              <Button

                onClick={handleFormSubmit}
                colorScheme='whatsapp'
                _hover={{ bg: 'gray.400', }} >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}