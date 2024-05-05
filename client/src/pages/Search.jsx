
import { useState, useEffect } from 'react'; 

import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, IconButton, Input, Box, Stack, Heading, Divider, ButtonGroup, Button, Image, Text, Link  } from '@chakra-ui/react'
// import chakra ui design elements


import { SearchIcon } from '@chakra-ui/icons';
// import icon from chakra ui

import Auth from '../utils/auth';

import { getDeals, gameSearch } from '../utils/API';

import { SAVE_GAME } from '../utils/mutations';
// import save game mutation

import { useMutation } from '@apollo/client';

const SearchGames = (props) => {
    const [searchedGames, setSearchedGames] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    

    const swapPage = (location) => {
        window.location.href = location;
    };

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
              const games  = await response.json();
              
              const gameData = games.map((game) => ({
                gameId: game.gameID,
                title: game.external,
                gameImg: game.thumb,
                deal: game.cheapest,
                dealId: 'https://www.cheapshark.com/redirect?dealID=' + game.cheapestDealID
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
            <div>
                {searchedGames.map((game) => {
                    return (
                        
                          <div key={game.gameId}>
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
                           <Button onClick={() => handleSaveGame(game.title)} variant='solid' colorScheme='blue'>
                             Track
                          </Button>
                          
                          <Button onClick={() => swapPage(game.dealId)}>
                            Checkout deal
                          </Button>
                        </ButtonGroup>
                        </CardFooter>
                        </Card>

                          
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}


export default SearchGames;
// export as