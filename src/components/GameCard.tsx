import React from 'react';
import { Card, Col } from 'antd';
import { IGame } from '../models/IGame';
import { Link } from 'react-router-dom'
interface Props {
    game: IGame;
}

const { Meta } = Card;

const GameCard: React.FC<Props> = ({ game }) => {
    return (
        <Col xs={24} sm={10} md={6} lg={4} xl={3} style={{ marginBottom: '20px', padding: '0 10px' }}>
            <Link to={`/${game.id}`}>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img src={game.thumbnail} alt={game.title} style={{ objectFit: 'cover', height: '200px' }} />}
            >
                <Meta title={game.title} description={game.short_description} />
            </Card>
            </Link>
        </Col>
    );
};

export default GameCard;
