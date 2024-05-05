import { SearchGames } from './pages/Search'import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

import Navbar from './components/NavBar';

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
import { SearchGames } from './pages/Search'
import { saveGame } from './pages/Saves'
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ApolloProvider client={client}>
      
        <Navbar />
        <Outlet />
      
    </ApolloProvider>
  );
}

export default App;
