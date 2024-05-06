import { Card, CardBody, CardFooter,IconButton, Input, Flex, Box, Heading, Spacer, ButtonGroup, Button, Image, Text, Container } from '@chakra-ui/react'
import { gameSearchExact } from '../utils/API';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { useState, useEffect } from 'react';
import { REMOVE_GAME } from '../utils/mutations';

const SaveGame = () => {
    const [savedGames, setSavedGames] = useState([]);
    const [userData, setUserData] = useState([]); // State for userData

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const [removeGame] = useMutation(REMOVE_GAME);
    const { data } = useQuery(QUERY_USER, {
        variables: { token }
    });

    useEffect(() => {
        if (data) {
            fetchData(data.me.trackedGames);
        }
    }, [data]);

    const fetchData = async (trackedGames) => {
        try {
                const games = await getGameData(trackedGames);
                setUserData(games); // Update userData
                setSavedGames(games);
                console.log(savedGames);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };

    

    const getGameData = async (savedGames) => {
        let games = [];
        for (let i = 0; i < savedGames.length; i++) {
            const response = await gameSearchExact(savedGames[i].title);
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            const game = await response.json();
            games.push(game[0]);
        }
        return games;
    };


    const deleteGame = async (gameid) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await removeGame({
                variables: { gameid }
            });
            removeGame(gameid);
        } catch (err) {
            console.error(err);
        }
    };

    if (savedGames.length === 0) {
        return <h2>Loading...</h2>; // or some loading indicator
    }

    return (
        <>
        <Flex p='5' m='5'>
        <Box  flex='1' w='100%'>
        <Text  align="center" fontSize='5xl' >Saved Games</Text>
                <Text fontsize='4xl'>
                    {savedGames.length
                        ? `Viewing ${savedGames.length} saved ${savedGames.length === 1 ? 'game' : 'games'}:`
                        : 'You have no saved games!'}
                </Text>
                
                    {savedGames.map((game) => {

                        return (
                            <div key={game.gameID}>
                                <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' align='center'>>
                                    {game.thumb ? <Image objectFit='cover' src={game.thumb} alt={`the cover for ${game.external}`} /> : null}
                                    
                                    <CardBody align="center">
                                        <Heading>{game.external}</Heading>
                                        <p>Sale price: {game.cheapest}</p>
                                        <Button colorScheme='whatsapp' _hover={{ bg: 'gray.400' }} onClick={() => deleteGame(game.gameID)}>
                                            Remove game
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                
            
            </Box>
            </Flex>
        </>
    );
};

export default SaveGame;