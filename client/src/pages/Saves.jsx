import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, IconButton, Input, Box, Stack, Heading, Divider, ButtonGroup, Button, Image, Text, Link  } from '@chakra-ui/react'
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
        <div flui1d>
            <Container>
                <h2>{userData.username} saved games.</h2>
            </Container>
        </div>

        <Container>

            <h3>
                {savedGame.length
                ? `Viewing ${userData.saveGame.length} saved ${userData.saveGame.length === 1 ? 'game' : 'games'}:`
                : 'You have no saved games!'}
            </h3>

        <SimpleGrid>

            {userData.saveGame?.map((game) =>{
            
            return (
                    
                <div key={game.gameid}>
                    
                    <Card>
                        {game.image ? <Card.img src={game.gameimg} alt={`the cover for ${game.title}`} /> : null}
                        
                        <Card.body>
                            
                            <Card.title>{game.title}</Card.title>
                            <p>Sale price: {game.deal}</p>
                            <p>retail price: {game.retail}</p>
                            <Button colorScheme='whatsapp' _hover={{ bg: 'gray.400', }} onClick={() => deleteGame(game.gameid)}>
                                Remove game
                            </Button>

                        </Card.body>

                    </Card>

                </div>

            )  
            })}

        </SimpleGrid>

        </Container>
        
        </>
    );
};

export default SaveGame;