import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Search';
import Saves from './pages/Saves';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';


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

  <RouterProvider router={router} />
)



