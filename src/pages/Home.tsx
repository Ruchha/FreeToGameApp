import { FC, useState, useEffect } from 'react';
import GamesList from '../components/GamesList';
import GamesFilter from '../components/GamesFilter';
import { Alert, Divider, Layout, Pagination, Spin, Typography } from 'antd';
import { useAppSelector } from '../hooks/redux';
import { gamesAPI } from '../services/GamesServices';
import { IGame } from '../models/IGame';


const MAX_RETRIES = 3;

const Home: FC = () => {

    const filter = useAppSelector(state => state.filter)
    const [retryCount, setRetryCount] = useState(0)
    const { data: games, isFetching, error, refetch, isLoading } = gamesAPI.useFetchGamesQuery(filter, {
        skip: retryCount >= MAX_RETRIES,
    })
    const [currentGames, setCurrentGames] = useState<IGame[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)

    function handlePageChange(page: number, pageSize: number) {
        setPage(page);
        setPageSize(pageSize);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (games?.length) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCurrentGames(games.slice(startIndex, endIndex));
        }
        else {
            setCurrentGames([])
        }
    }, [page, pageSize, games]);

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
        <Layout>
            <GamesFilter />
            {(error && 'status' in error) && <Alert message={`${error.status}, Повторных попыток осталось: ${MAX_RETRIES - retryCount}`} type="error" />}
            {isFetching || isLoading
            ?
            <Spin size='large'/>
            :
            games && games.length
            ?
            <>
            <GamesList games={currentGames}/>
            <Divider />
            <Pagination style={{margin:"0px auto", marginBottom:"20px"}} current={page} pageSize={pageSize} total={games?.length} onChange={(page, pageSize) => handlePageChange(page, pageSize)}/>
            </>
            :
            <Typography.Paragraph style={{textAlign:"center"}} type='warning'>Игр не найдено :( Попробуйте изменить настройки сортировки/фильтрации/поиска</Typography.Paragraph> 
            }

        </Layout>
    );
};

export default Home