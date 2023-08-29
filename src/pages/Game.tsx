import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { gamesAPI } from '../services/GamesServices';
import NotFound from '../components/NotFound';
import { PageHeader } from '@ant-design/pro-components';
import GameDetails from '../components/GameDetails';
import { Alert } from 'antd';
const Game: FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: game, error, isLoading } = gamesAPI.useFetchGameByIdQuery(Number(id))
    console.log(error)
    if (error) {
        if ('status' in error) {
            if (error.status === 404) {
                return <NotFound />
            }
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            {(error && 'status' in error) && <Alert message={error.status} type="error" style={{marginBottom:"20px"}} />}
            <PageHeader
                title={game?.title}
                onBack={() => navigate("/")}
                style={{ background: "white", borderRadius: "8px", marginBottom: "20px" }}
            />
            <GameDetails game={game} isLoading={isLoading} />
        </div>
    );
}

export default Game