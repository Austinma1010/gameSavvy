import { Button, Container, Card, SimpleGrid, } from '@chakra-ui/react'
// import chakra ui elements 

import { useQuery, useMutation } from '@apollo/client'

import { QUERY_USER} from '../utils/queries';
// import query user from queries file

import auth from '../utils/auth';

import { REMOVE_GAME } from '../utils/mutations';
// import remove game mutation

const saveGame = () => {
    const {loading, data} = useQuery(QUERY_USER);
    const [removeGame, {error}] = useMutation(REMOVE_GAME);

    console.log("saveGame")
    const userData = data?.user || {};
    const savedGame = userData.trackedGame || [];

    if (loading) {
        return <h2>loading....</h2>
    }

    const deleteGame = async (gameid) => {
        const token = auth.loggedIn() ? auth.getToken() : null;

        if(!token) {
            return false;
        }

        try{

            const {data} = await removeGame({
                variables: {gameid}
            });

            removeGame(gameid);
        }
        catch (err) {
            console.error(err);
        }
    };


    return (
        <> 
        <div flui1d>
        <Container>
        <h1>GameSavvy</h1>
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
                                <Button onClick={() => deleteGame(game.gameid)}>
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

export default saveGame;
// export as