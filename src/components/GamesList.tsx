import {FC, useState} from 'react';
import { gamesAPI } from '../services/GamesServices';
import GameCard from './GameCard';
import { Row, Alert, Spin } from 'antd'
import { useAppSelector } from '../hooks/redux';

const GamesList: FC = () => {
    const filter = useAppSelector(state => state.filter)
    const {data: games, error, isFetching} = gamesAPI.useFetchGamesQuery(filter)


    return (
        <>      
        <Row justify="center"  style={{ marginTop: "20px", gap:"5px" }}>
            {isFetching
            ?
            <Spin style={{margin:"0 auto"}} size='large'/>
            :
            games?.map(game => (
                <GameCard key={game.id} game={game} />
            ))}

        </Row>
       
        </>
);
};

export default GamesList