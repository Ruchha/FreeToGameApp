import React from 'react';
import { Card, Col, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IGame } from '../models/IGame';

interface Props {
    game: IGame;
}

const GameCard: React.FC<Props> = ({ game }) => {
    return (
            <Link to={`/${game.id}`}>
                <Card
                    hoverable
                    cover=
                    {
                    <>
                        <img src={game.thumbnail} alt={game.title} style={{ objectFit: 'cover', height: '160px' }} />
                        <Tag style={{ position: 'absolute', top: 10, left: 10, width: "auto" }} color='black'>{game.genre}</Tag>
                    </>
                    }
                >
                    <Card.Meta
                        title={game.title}
                        description={
                            <>
                                <Typography.Paragraph type='secondary'><strong>Дата выхода:</strong> {game.release_date}</Typography.Paragraph>
                                <Typography.Paragraph type='secondary'><strong>Издатель:</strong> {game.publisher}</Typography.Paragraph>
                            </>
                        }
                    />
                </Card>
            </Link>
    );
};

export default GameCard;
