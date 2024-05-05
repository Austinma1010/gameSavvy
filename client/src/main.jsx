import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Home from './pages/Search';
import Saves from './pages/Saves';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/saves',
        element: <Saves/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/signup',
        element: <Signup/>,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
<React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
  </ApolloProvider>
)


