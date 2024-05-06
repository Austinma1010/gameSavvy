
import { useState, useEffect } from 'react'; 

import { Card, CardBody, CardFooter,IconButton, Input, Flex, Box, Heading, Spacer, ButtonGroup, Button, Image, Text, Container } from '@chakra-ui/react'
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

    <Flex p='5' m='5'>
        <Container direction={{ base: 'column', sm: 'row' }} overflow='hidden' align='center'  >
           <Box  flex='1' w='100%'>
            <Text  fontSize='6xl' >Search for a game to begin</Text>
            
            <form onSubmit={handleFormSubmit}>
                <Input m='4'
                placeholder='Enter Game Title'
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
                <IconButton m='2'
                type='submit'
                colorScheme='whatsapp'
                size='lg'
                aria-label='Search database'
                icon={<SearchIcon />}
                />
            </form>
            
            </Box>
        

        <Box >
            <div>
                <Text m='4' fontSize='3xl' align="center" >
                    {searchedGames.length
                    ? `Viewing ${searchedGames.length} results:`
                    : ''}
                </Text>
            <div>
            
            
            {searchedGames.map((game) => {
                    
            return (
              
                <div key={game.gameId}>
                <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' align='center'>

                    <CardBody align="center">

                        <Image 
                            objectFit='cover'
                            src={game.gameImg}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            />

                        <Heading size='lg'>{game.title}</Heading>
                           
                        <Text color='red' fontSize='2xl'>
                            Lowest Price: {game.deal}
                        </Text>

                    </CardBody>

                    <CardFooter >

                        <ButtonGroup spacing='2'>

                            <Button onClick={() => handleSaveGame(game.title)} variant='solid' colorScheme='whatsapp' size='md' _hover={{ bg: 'gray.400', }}>
                                Track
                            </Button>
                          
                            <Button onClick={() => swapPage(game.dealId)} colorScheme='whatsapp' size='md' _hover={{ bg: 'gray.400', }} >
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
        </Box>
    </Container>
    </Flex>
        </>
    )
}


export default SearchGames;
// export as