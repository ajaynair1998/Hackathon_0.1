import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { LocationOn } from '@material-ui/icons';
import { Link } from 'react-router-dom';
// @ts-ignore
import placeholder from '../../assets/img/placeholder.png';
import './ProductCard.scss';

class ProductCard extends Component {
  render() {
    const { productName, image, price, location, className, _id } = this.props;

    return (
      <div className="productCardComp">
        <Link to={`/products/${_id}`}>
          <Card className={`productCardComp ${className}`} variant="outlined">
            <CardMedia
              className={`productCardComp__img ${
                !image && 'productCardComp__img--placeholder'
              }`}
              image={image || placeholder}
              title={`Product image of ${productName.toLowerCase()}`}
            />
            <CardContent className="productCardComp__content">
              {/* <Typography
                variant="overline"
                component="div"
                className="productCardComp__location"
              >
                <LocationOn />
                <span>{location}</span>
              </Typography> */}
              <Typography
                className="productCardComp__name"
                variant="h6"
                component="p"
              >
                {productName}
              </Typography>
              <Typography variant="h4" component="div" className="price">
                <span className="price__currency">Rs. </span>
                <span className="price__value">{price}</span>
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
