import { Button, Container, Card, SimpleGrid, } from '@chakra-ui/react'
import { useQuery, useMutation } from '@apollo/client'
import auth from '../utils/auth';



const Home = () => {
  const { loading, data } = useQuery();

  return (
    <main>
    
    </main>
  );
};

export default Home;


