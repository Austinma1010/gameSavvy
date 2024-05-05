import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { Button, Container, Card, SimpleGrid,Modal,  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,} from '@chakra-ui/react'
import Auth from '../utils/auth';

const Navbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header bg='dark' variant='dark' expand='lg'>
        <div >
          <div />
          <div>
            <div className='ml-auto d-flex'>
              <h1 >
                Search For Games
              </h1>
              {Auth.loggedIn() ? (
                <>
                  
                  <Button onClick={Auth.logout}>Logout</Button>
                </>
              ) : (
                <Button onClick={() => setShowModal(true)}>Login/Sign Up</Button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Container defaultActiveKey='login'>
          <ModalCloseButton>
            <div id='signup-modal'>
              <div variant='pills'>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/signup'>Sign Up</Link>
                </li>
              </div>
            </div>
          </ModalCloseButton>
          <ModalBody>
            {/* <div>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </div> */}
          </ModalBody>
        </Container>
      </Modal>
    </>
  );
};

export default Navbar;