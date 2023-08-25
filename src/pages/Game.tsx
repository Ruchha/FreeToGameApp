import {FC} from 'react';
import { useParams } from 'react-router-dom'
import { gamesAPI } from '../services/GamesServices';
import { Card, Carousel, Col, Image, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
const Game: FC = () => {
    const {id} = useParams()
    const {data:game, error} = gamesAPI.useFetchGameByIdQuery(Number(id))

    return (
        <Layout.Content>
        <Content style={{ padding: '20px' }}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={18} md={14} lg={12}>
                    <Card>
                        <Image src={game?.thumbnail} alt={game?.title} />
                        <Card.Meta title={game?.title} description={game?.short_description} />
                    </Card>
                </Col>
                <Col xs={24} sm={18} md={14} lg={12}>
                    <Card title="Описание">
                        <p>{game?.description}</p>
                    </Card>
                </Col>
                <Col xs={24} sm={18} md={14} lg={12}>
                    <Card title="Details">
                        <p><strong>Жанр:</strong> {game?.genre}</p>
                        <p><strong>Платформа:</strong> {game?.platform}</p>
                        <p><strong>Издатель:</strong> {game?.publisher}</p>
                        <p><strong>Разработчик:</strong> {game?.developer}</p>
                        <p><strong>Дата выхода:</strong> {game?.release_date}</p>
                    </Card>
                </Col>
                <Col xs={24} sm={18} md={14} lg={12}>
                    <Card title="Minimum System Requirements">
                        <p><strong>Операционная система:</strong> {game?.minimum_system_requirements?.os}</p>
                        <p><strong>Процессор:</strong> {game?.minimum_system_requirements?.processor}</p>
                        <p><strong>Оперативная память:</strong> {game?.minimum_system_requirements?.memory}</p>
                        <p><strong>Видеокарта:</strong> {game?.minimum_system_requirements?.graphics}</p>
                        <p><strong>Место:</strong> {game?.minimum_system_requirements?.storage}</p>
                    </Card>
                </Col>
                <Col xs={24} sm={18} md={14} lg={12}>
                    <Card title="Screenshots">
                            <Carousel autoplay arrows>
                                {game?.screenshots?.map(screenshot => (
                                    <div key={screenshot.id}>
                                        <Image src={screenshot.image} alt={`Screenshot ${screenshot.id}`} />
                                    </div>
                                ))}
                            </Carousel>
                    </Card>
                </Col>
            </Row>
        </Content>
    </Layout.Content>
);
}

export default Game