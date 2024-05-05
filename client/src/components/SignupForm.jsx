import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, useColorModeValue } from '@chakra-ui/react';
// import chakra ui sign up form elements

import { useState } from 'react';
import { useMutation,  } from '@apollo/client';

import { ADD_USER } from '../utils/mutations';
// import add user mutation 

import Auth from '../utils/auth';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [createUserMutation, { loading, error }] = useMutation(ADD_USER);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
const { username, email, password } = userFormData;
    try {
      console.log(userFormData);
      const data = await createUserMutation({
        variables: {username,email,password}
      });
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl onChange={handleInputChange} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input  onChange={handleInputChange} name="email" value={userFormData.email} type="email" />
            </FormControl>
            <FormControl onChange={handleInputChange} id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input onChange={handleInputChange} name="password" value={userFormData.password} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input onChange={handleInputChange} name='username' value={userFormData.username} type="text" />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleFormSubmit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}