import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ItemSlider } from '../Interface';
import { Link } from 'react-router-dom';
import Button from './Button';

interface HeroSlideProps {
  data: ItemSlider[];
  control?: boolean;
  auto?: boolean;
  timeOut?: number;
}

const HeroSlide = (props: HeroSlideProps) => {
  const data = props.data;

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  const prevSlide = useCallback(() => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  }, [activeSlide, data]);

  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);

      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, props.auto]);

  return (
    <div className="hero-slider">
      {data.map((item, index) => (
        <HeroSliderItem key={index} item={item} active={index === activeSlide} />
      ))}
      {props.control ? (
        <div className="hero-slider__control">
          <div className="hero-slider__control__item" onClick={prevSlide}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__item">
            <div className="index">
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <div className="hero-slider__control__item" onClick={nextSlide}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

HeroSlide.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

interface HeroSliderItemProps {
  active: boolean;
  item: ItemSlider;
}

const HeroSliderItem = (props: HeroSliderItemProps) => (
  <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
    <div className="hero-slider__item__info">
      <div className={`hero-slider__item__info__title color-${props.item.color}`}>
        <span>{props.item.title}</span>
      </div>
      <div className="hero-slider__item__info__description">
        <span>{props.item.description}</span>
      </div>
      <div className="hero-slider__item__info__btn">
        <Link to={props.item.path}>
          <Button backgroundColor={props.item.color} icon="bx bx-cart" animate={true}>
            Xem chi tiết
          </Button>
        </Link>
      </div>
    </div>
    <div className="hero-slider__item__image">
      <div
        className={`shape bg-${props.item.color}`}
        style={{ backgroundColor: props.item.color === 'blue' ? '#4267b2' : props.item.color }}
      ></div>
      <img src={props.item.img} alt="" />
    </div>
  </div>
);

export default HeroSlide;
