import { Card, Col, Descriptions, Image, Row, Skeleton } from 'antd';
import {FC} from 'react';
import { formatDate } from '../utils/formatDate';
import { IGame } from '../models/IGame';
import MyCarousel from './UI/MyCarousel';

interface Props {
    game:IGame | undefined;
    isLoading: boolean;
}

export const GameDetails: FC<Props> = ({game, isLoading}) => {
    return (
        <Row gutter={[16, 16]} justify="center">      
        <Col xs={24} sm={18} md={14} lg={12}>
            <Card>
                {isLoading
                ?
                <Skeleton active/>
                :
                <>
                <Image src={game?.thumbnail} alt={game?.title} />
                <Card.Meta title={game?.title} description={game?.short_description} />
                </>}

            </Card>
        </Col>
        <Col xs={24} sm={18} md={14} lg={12}>
            <Card title="Описание">
               {isLoading
               ?
               <Skeleton active/>
               :
               <p>{game?.description}</p>}
            </Card>
        </Col>
        <Col xs={24} sm={18} md={14} lg={12}>
            <Card title="Подробности">
                {isLoading
                ?
                <Skeleton active/>
                :                   
                <Descriptions title="" >
                  <Descriptions.Item label="Жанр">{game?.genre}</Descriptions.Item>
                  <Descriptions.Item label="Платформа">{game?.platform}</Descriptions.Item>
                  <Descriptions.Item label="Издатель">{game?.publisher}</Descriptions.Item>
                  <Descriptions.Item label="Разработчик">{game?.developer}</Descriptions.Item>
                  <Descriptions.Item label="Дата выхода" style={{textAlign:"center"}}>{formatDate(game?.release_date!)}</Descriptions.Item>
                </Descriptions>
                }           
            </Card>
        </Col>
        <Col xs={24} sm={18} md={14} lg={12}>
            <Card title="Минимальные системные требования">
                {isLoading
                ?
                <Skeleton active/>
                :
                <>
                <p><strong>Операционная система:</strong> {game?.minimum_system_requirements?.os}</p>
                <p><strong>Процессор:</strong> {game?.minimum_system_requirements?.processor}</p>
                <p><strong>Оперативная память:</strong> {game?.minimum_system_requirements?.memory}</p>
                <p><strong>Видеокарта:</strong> {game?.minimum_system_requirements?.graphics}</p>
                <p><strong>Место:</strong> {game?.minimum_system_requirements?.storage}</p>
                </>}
                
            </Card>
        </Col>
        <Col xs={24} sm={18} md={14} lg={12}>
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