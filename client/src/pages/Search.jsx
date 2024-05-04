import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, IconButton, Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import Auth from '../utils/auth';
import { getDeals, gameSearch } from '../utils/API';
import { SAVE_GAME } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const SearchGames = () => {
    const [searchedGames, setSearchedGames] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await gameSearch(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
              }

              const { games } = await response.json();
              const gameData = games.map((game) => ({
                gameId: game.gameID,
                title: game.external,
                gameImg: game.thumb,
                deal: game.cheapest,
                dealId: game.cheapestDealID
              }));

              setSearchedGames(gameData)
              setSearchInput('');
        } catch(err) {
            console.error(err);
        }
    };

    const handleSaveGame = async (title) => {
        const [saveGameMutation, { loading, error }] = useMutation(SAVE_GAME);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        try {
            const { data } = await saveGameMutation({
                variables: { title },
              });
              console.log('Game Saved!');
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <>
        <div>
            <h2>Search for Games!</h2>
            <form onSubmit={handleFormSubmit}>
                <Input 
                placeholder='Enter Game Title'
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
                <IconButton
                type='submit'
                colorScheme='blue'
                aria-label='Search database'
                icon={<SearchIcon />}
                />
            </form>
        </div>
        <div>
            <h2 className='pt-5'>
             {searchedGames.length
             ? `Viewing ${searchedGames.length} results:`
             : 'Search for a game to begin'}
            </h2>
            <SimpleGrid columns={2} spacing={10}>
                {searchedGames.map((game) => {
                    return (
                        <>
                          <Box height='80px'>
                          <Card maxW='sm'>
                           <CardBody>
                            <Image
                             src={game.gameImg}
                             alt='Green double couch with wooden legs'
                             borderRadius='lg'
                           />
                          <Stack mt='6' spacing='3'>
                           <Heading size='md'>{game.title}</Heading>
                           
                           <Text color='blue.600' fontSize='2xl'>
                             Lowest Price: {game.deal}
                           </Text>
                          </Stack>
                           </CardBody>
                           <Divider />
                           <CardFooter>
                          <ButtonGroup spacing='2'>
                           <Button onClick={handleSaveGame} variant='solid' colorScheme='blue'>
                             Track
                          </Button>
                
                        </ButtonGroup>
                        </CardFooter>
                        </Card>

                          </Box>
                        </>
                    )
                })}
            </SimpleGrid>
        </div>
        </>
    )
}


export default SearchGames;
