import { Button, Container, Card, SimpleGrid, } from '@chakra-ui/react'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER} from '../utils/queries';
import auth from '../utils/auth';
import {}

const Home = () => {
  const { loading, data } = useQuery();

  return (
    <main>
    
    </main>
  );
};

export default Home;

