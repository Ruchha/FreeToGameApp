import { FC, useState, useMemo } from 'react';
import GameCard from './GameCard';
import { Input, Row, Spin, Typography } from 'antd'
import { IGame } from '../models/IGame';
import { SearchOutlined } from '@ant-design/icons';


interface Props{
    games: IGame[] | undefined;
    isFetching: boolean;
}

const GamesList: FC<Props> = ({ games, isFetching }) => {
    const [gamesSearch, setGamesSearch] = useState("")
    const searchedGames = useMemo(() => gamesSearch ? games?.filter(game => game.title.toLowerCase().includes(gamesSearch.toLowerCase())) : games, [gamesSearch, games])

    return (
        <>
        <Input prefix={<SearchOutlined />} value={gamesSearch} onChange={e => setGamesSearch(e.target.value)} placeholder='Поиск по названию'/>

        <Row justify="center"  style={{ marginTop: "20px", gap:"20px" }}>
            {isFetching
            ?
            <Spin style={{margin:"0 auto"}} size='large'/>
            :
            games?.length
            ?
            searchedGames?.map(game =>     
                <GameCard key={game.id} game={game} />
            )
            :
            <Typography.Paragraph type='warning'>Игр не найдено :( Попробуйте изменить настройки фильтра</Typography.Paragraph>
            }
        </Row>
        </>

        
);
};

export default GamesList