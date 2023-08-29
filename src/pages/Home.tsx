import { FC, useState, useEffect } from 'react';
import GamesList from '../components/GamesList';
import GamesFilter from '../components/GamesFilter';
import { Alert, Layout, Pagination } from 'antd';
import { useAppSelector } from '../hooks/redux';
import { gamesAPI } from '../services/GamesServices';
import { IGame } from '../models/IGame';

const MAX_RETRIES = 3;

const Home: FC = () => {

    const filter = useAppSelector(state => state.filter)
    const [retryCount, setRetryCount] = useState(0)
    const { data: games, isFetching, error, refetch } = gamesAPI.useFetchGamesQuery(filter, {
        skip: retryCount >= MAX_RETRIES,
    })
    const [currentGames, setCurrentGames] = useState<IGame[]>([])

    function handlePageChange(page:number, pageSize:number){
        if(games?.length){
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCurrentGames(games?.slice(startIndex, endIndex))
            window.scrollTo(0,0)
        }
    }

    useEffect(() => {
        if(games?.length){
            setCurrentGames(games.slice(0, 30))
        }
    },[games])

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
            <GamesList games={currentGames} isFetching={isFetching}/>       
            <Pagination style={{margin:"0px auto", marginBottom:"20px"}} hideOnSinglePage defaultCurrent={1} pageSize={30} total={games?.length} onChange={(page, pageSize) => handlePageChange(page, pageSize)}/>     
        </Layout>
    );
};

export default Home