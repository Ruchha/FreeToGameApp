import {FC} from 'react';
import { useParams } from 'react-router-dom'
import { gamesAPI } from '../services/GamesServices';
const Game: FC = () => {
    const {id} = useParams()
    const {data:game, error} = gamesAPI.useFetchGameByIdQuery(Number(id))

    return (
        <div>
            <img src={game?.screenshots ? game.screenshots[0].image : undefined}/>
        </div>
);
};

export default Game