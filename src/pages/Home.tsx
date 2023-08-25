import {FC} from 'react';
import GamesList from '../components/GamesList';
import GamesFilter from '../components/GamesFilter';
import { Layout } from 'antd';

const Home: FC = () => {

    return (
        <Layout.Content>
        <GamesFilter/>
        <GamesList/>
        </Layout.Content>
);
};

export default Home