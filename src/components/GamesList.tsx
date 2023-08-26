import { FC, useState, useEffect } from 'react';
import { gamesAPI } from '../services/GamesServices';
import GameCard from './GameCard';
import { Alert, Row, Spin } from 'antd'
import { useAppSelector } from '../hooks/redux';

const MAX_RETRIES = 3;

const GamesList: FC = () => {
    const filter = useAppSelector(state => state.filter)
    console.log(filter)
    const [retryCount, setRetryCount] = useState(0)
    
    const {data: games, isFetching, error, refetch} = gamesAPI.useFetchGamesQuery(filter,{
        skip: retryCount >= MAX_RETRIES,
    })

    useEffect(() => {
        if (error && 'status' in error && retryCount < MAX_RETRIES) {
            const timer = setTimeout(() => {
                setRetryCount(prev => prev + 1)
                refetch()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [error, retryCount, refetch])
    
   

    return (
        <>      
        <Row justify="space-evenly"  style={{ marginTop: "20px", gap:"20px" }}>
            {(error && 'status' in error) && <Alert message={`${error.status}, Повторных попыток осталось: ${MAX_RETRIES - retryCount}`} type="error"/>}
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