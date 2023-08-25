import {FC, useState} from 'react';
import { gamesAPI } from '../services/GamesServices';
import GameCard from './GameCard';
import { Row, Alert } from 'antd'
import { useAppSelector } from '../hooks/redux';

const GamesList: FC = () => {
    const filter = useAppSelector(state => state.filter)
    const {data: games, error} = gamesAPI.useFetchGamesQuery(filter)
    const [visible, setVisible] = useState(false)

    if(error){
        setVisible(true)
    }
    function handleClose(){
        setVisible(false)
    }
    return (
        <>
         {visible && <Alert message="Alert Message Text" type="error" closable afterClose={handleClose} />}
        <Row justify="center"  style={{ marginTop: "20px", gap:"5px" }}>
            {games?.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </Row>
       
        </>
);
};

export default GamesList