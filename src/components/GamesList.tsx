import { FC } from 'react';
import GameCard from './GameCard';
import { Col, Divider, Input, Row, Spin, Typography } from 'antd'
import { IGame } from '../models/IGame';


interface Props {
    games: IGame[] | undefined;
    isFetching: boolean;
}

const GamesList: FC<Props> = ({ games, isFetching }) => {


    return (
        <Col>
            <Divider />
            <Row justify="center" style={{ gap: "20px", marginBottom:"20px" }}>
                {isFetching
                ?
                <Spin size='large' />
                :
                games?.length
                ?
                games.map(game => 
                    <GameCard key={game.id} game={game} />)
                :
                <Typography.Paragraph style={{textAlign:"center"}} type='warning'>Игр не найдено :( Попробуйте изменить настройки сортировки/фильтрации/поиска</Typography.Paragraph>
                }
            </Row>
        </Col>


    );
};

export default GamesList

//if(games && 'status' in games){
//    console.log("catched")
//}