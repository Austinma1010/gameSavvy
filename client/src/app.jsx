import { SearchGames } from './pages/Search'
import Navbar from './components/NavBar';
import { SearchGames } from './pages/Search'
import { saveGame } from './pages/Saves'
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <SearchGames />
      <saveGame />

      </ChakraProvider>

  );
}

export default App;
