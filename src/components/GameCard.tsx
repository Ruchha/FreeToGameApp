import React from 'react';
import { Card, Col, Image, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { IGame } from '../models/IGame';
import { formatDate } from '../utils/formatDate';

interface Props {
    game: IGame;
}

const GameCard: React.FC<Props> = ({ game }) => {
    return (
        <Col xs={24} sm={10} md={6} lg={5} xl={4} xxl={3}>
            <Link to={`/${game.id}`}>
                <Card
                    style={{margin:"0px 10px 0px 10px"}}
                    hoverable
                    cover=
                    {
                    <>
                        <Image preview={false} src={game.thumbnail} alt={game.title} style={{ objectFit: 'cover', height: '160px' }} />
                        <Tag style={{ position: 'absolute', top: 10, left: 10, width: "auto" }} color='black'>{game.genre}</Tag>
                    </>
                    }
                >
                    <Card.Meta
                        title={game.title}
                        description={
                            <>
                                <Typography.Paragraph type='secondary'><strong>Дата выхода:</strong> {formatDate(game.release_date)}</Typography.Paragraph>
                                <Typography.Paragraph type='secondary'><strong>Издатель:</strong> {game.publisher}</Typography.Paragraph>
                            </>
                        }
                    />
                </Card>
            </Link>
            </Col>
    );
};

export default GameCard;
