import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/NavBar';
// importing navbar



function App() {
  return (

<>
        <Navbar />
        <Outlet />
        </>   
    
  )
}

export default App;