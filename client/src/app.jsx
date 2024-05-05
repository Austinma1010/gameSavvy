import './App.css';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/NavBar';

function App() {
  return (
    <>
    <ChakraProvider>
      <Navbar />
      <Outlet />
    </ChakraProvider>
    </>

  );
}

export default App;
