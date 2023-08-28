import { Card, Col, Descriptions, Image, Row, Skeleton, Typography } from 'antd';
import { FC } from 'react';
import { formatDate } from '../utils/formatDate';
import { IGame } from '../models/IGame';
import MyCarousel from './UI/MyCarousel';

interface Props {
    game: IGame | undefined;
    isLoading: boolean;
}

export const GameDetails: FC<Props> = ({ game, isLoading }) => {
    return (
        <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={18} md={14} lg={10}>
                <Card cover={<Image src={game?.thumbnail}/>}>    
                    {isLoading
                        ?
                        <Skeleton active />
                        :
                        <Card.Meta description={game?.short_description} />
                        }

                </Card>
            </Col>
            <Col xs={24} sm={18} md={14} lg={10}>
                <Card title="Описание">
                    {isLoading
                        ?
                        <Skeleton active />
                        :
                        <Typography.Text>{game?.description}</Typography.Text>}
                </Card>
            </Col>
            <Col xs={24} sm={18} md={14} lg={10}>
                <Card title="Подробности">
                    {isLoading
                        ?
                        <Skeleton active />
                        :
                        <>
                        <Typography.Paragraph><strong>Жанр:</strong> {game?.genre}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Платформа</strong> {game?.platform}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Издатель</strong> {game?.publisher}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Видеокарта</strong> {game?.developer}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Дата выхода</strong> {formatDate(game?.release_date!)}</Typography.Paragraph>
                        </>
                    }
                </Card>
            </Col>
            <Col xs={24} sm={18} md={14} lg={10}>
                <Card title="Минимальные системные требования">
                    {isLoading
                        ?
                        <Skeleton active />
                        :
                        <>
                            <Typography.Paragraph><strong>Операционная система:</strong> {game?.minimum_system_requirements?.os}</Typography.Paragraph>
                            <Typography.Paragraph><strong>Процессор:</strong> {game?.minimum_system_requirements?.processor}</Typography.Paragraph>
                            <Typography.Paragraph><strong>Оперативная память:</strong> {game?.minimum_system_requirements?.memory}</Typography.Paragraph>
                            <Typography.Paragraph><strong>Видеокарта:</strong> {game?.minimum_system_requirements?.graphics}</Typography.Paragraph>
                            <Typography.Paragraph><strong>Место:</strong> {game?.minimum_system_requirements?.storage}</Typography.Paragraph>
                        </>}
                </Card>
            </Col>
            <Col xs={24} sm={18} md={14} lg={10}>
            <Card title="Скриншоты игры">
                {isLoading ? <Skeleton active/> : 
                <MyCarousel>
                    {game?.screenshots?.map(screenshot => (
                         <div key={screenshot.id}>
                             <Image src={screenshot.image} alt={`Screenshot ${screenshot.id}`} />
                         </div>
                     ))}
                </MyCarousel>
                }
            </Card>
        </Col>
        </Row>
    );
};

export default GameDetails