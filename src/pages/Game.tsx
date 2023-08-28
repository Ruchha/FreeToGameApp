import {FC} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { gamesAPI } from '../services/GamesServices';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import NotFound from '../components/NotFound';
import { PageHeader } from '@ant-design/pro-components';
import GameDetails from '../components/GameDetails';
const Game: FC = () => {
    const {id} = useParams()
    const {data:game, error, isLoading} = gamesAPI.useFetchGameByIdQuery(Number(id))
    const navigate = useNavigate()

    if(error){
        if('status' in error){
            if(error.status === 404){
                return <NotFound/>
            }
        }
    }

    return (
        <Layout.Content style={{padding:"20px"}}>
        <PageHeader
            title={"Вернуться назад"}
            onBack={() => navigate("/")}
            style={{background:"white", borderRadius: "8px", marginBottom:"10px"}}
            />
        <GameDetails game={game} isLoading={isLoading}/>
    </Layout.Content>
);
}

export default Game