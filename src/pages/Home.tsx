import { FC, useState, useEffect } from 'react';
import GamesList from '../components/GamesList';
import GamesFilter from '../components/GamesFilter';
import { Alert, Layout, Spin, Typography } from 'antd';
import { useAppSelector } from '../hooks/redux';
import { gamesAPI } from '../services/GamesServices';

const MAX_RETRIES = 3;

const Home: FC = () => {

    const filter = useAppSelector(state => state.filter)
    const [retryCount, setRetryCount] = useState(0)
    const { data: games, isFetching, error, refetch } = gamesAPI.useFetchGamesQuery(filter, {
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
        <Layout style={{display:"flex", flexDirection:"column"}}>
            <GamesFilter />
            {(error && 'status' in error) && <Alert message={`${error.status}, Повторных попыток осталось: ${MAX_RETRIES - retryCount}`} type="error" />}
            <GamesList games={games} isFetching={isFetching}/>            
        </Layout>
    );
};

export default Home