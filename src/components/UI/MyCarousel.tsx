import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import React, {FC} from 'react';

interface ArrowProps {
    onClick?: () => void;
  }
interface CarouselProps{
    children: React.ReactNode
}

const CustomPrevArrow: FC<ArrowProps> = ({onClick}) => {
    return (
      <LeftOutlined
        onClick={onClick}
        className="slick-prev"
        style={{ left: 10, zIndex: 2, color: 'white', fontSize: 20, height: 30 }}
      />
    );
  };
  
const CustomNextArrow: FC<ArrowProps> = ({onClick}) => {
    return (
      <RightOutlined
        className="slick-next"
        onClick={onClick}
        style={{ right: 10, zIndex: 2, color: 'white', fontSize: 20, height: 30 }}
      />
    );
};


export const MyCarousel: FC<CarouselProps> = ({ children }) => {
    return (
        <Carousel draggable arrows prevArrow={<CustomPrevArrow />} nextArrow={<CustomNextArrow />}>
        { children }
      </Carousel>
);
};

export default MyCarousel