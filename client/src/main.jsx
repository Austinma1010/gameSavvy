import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import App from './App';
import theme from './theme'
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Search';
import Saves from './pages/Saves';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);



