import { FC } from 'react';
import GameCard from './GameCard';
import { Col, Divider, Row, } from 'antd'
import { IGame } from '../models/IGame';


interface Props {
    games: IGame[];
}

const GamesList: FC<Props> = ({ games }) => {


    return (
        <Col>
            <Divider />
            <Row justify="center" style={{ gap: "20px" }}>
                {
                games.map(game => 
                    <GameCard key={game.id} game={game} />)
                }
            </Row>
        </Col>


    );
};

export default GamesList