import React from 'react';
//import '../styles/carousel.scss';

const Carousel = ({ items }) => {
    const content = items.map(item => {
        return (
            <li className="carousel__item">
                <img className="carousel_item-image" src={item.src} />
            </li>
        );
    });
    return (
        <div className="carousel__container">
            <div className= 'carousel__viewport'>
            <ul className="carousel__content">{content} </ul>
            </div>
            {content.map( () => (
            <span className='carousel__page-indicator'>x</span>
            ))}

        </div>
    );
};

export default Carousel;
