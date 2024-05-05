import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  
  return (
    <>

      <Link to='/'>
      <h2>Game Savvy</h2>
      </Link>
      <div>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        <Link to='/Signup'>
          <button>Sign-up</button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;