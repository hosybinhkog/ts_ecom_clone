import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProductCard } from '../Interface';
import numberWithCommas from '../utils/numberWithCommas';
import Button from './Button';

const ProductCard = (props: IProductCard) => {
  return (
    <div className="product-card">
      <Link to={`/catalog/${props.slug}`}>
        <div className="product-card__image">
          <img src={props.img01} alt="" />
          <img src={props.img02} alt="" />
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
          {numberWithCommas(props.price)}
          <span className="product-card__price__old">
            <del>{numberWithCommas(3999999)}</del>
          </span>
        </div>
      </Link>
      <div className="product-card__btn">
        <Button size="sm" icon="bx bx-cart" animate={true} backgroundColor="blue">
          Chọn Mua
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  imgO1: PropTypes.any.isRequired,
  img02: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
