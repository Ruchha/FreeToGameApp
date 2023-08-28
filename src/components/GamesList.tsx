import { FC, useState, useMemo } from 'react';
import GameCard from './GameCard';
import { Divider, Input, Row, Spin, Typography } from 'antd'
import { IGame } from '../models/IGame';
import { SearchOutlined } from '@ant-design/icons';


interface Props {
    games: IGame[];
}

const GamesList: FC<Props> = ({ games }) => {
    const [gamesSearch, setGamesSearch] = useState("")
    const searchedGames = useMemo(() => gamesSearch ? games?.filter(game => game.title.toLowerCase().includes(gamesSearch.toLowerCase())) : games, [gamesSearch, games])

    return (
        <>
            <Row justify="center">
                <Input prefix={<SearchOutlined />} value={gamesSearch} onChange={e => setGamesSearch(e.target.value)} placeholder='Поиск по названию' style={{ width: "50%" }} />
            </Row>
            <Divider />
            <Row justify="center" style={{ gap: "20px" }}>
                {
                searchedGames.length
                ?
                searchedGames.map(game => 
                    <GameCard key={game.id} game={game} />)
                :
                <Typography.Paragraph style={{textAlign:"center"}} type='warning'>Игр не найдено :( Попробуйте изменить настройки поиска</Typography.Paragraph>
                }
            </Row>
        </>


    );
};

export default GamesList