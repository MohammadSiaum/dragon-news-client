import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Brand1 from '../../../assets/brands/Brand1.png';
import Brand2 from '../../../assets/brands/Brand2.png';

const BrandCarousel = () => {
    return (
        <Carousel className=''>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={Brand2}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={Brand2}
                    alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default BrandCarousel;