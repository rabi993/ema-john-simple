/* eslint-disable no-unused-vars */
import React from 'react';
import './Product.css';

const Product = (props) => {
    const {img, name, seller, ratings, price} = props.product;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h6 className='product-name'>{name}</h6>
            <p>Price: ${price}</p>
            <p>Menufacturer: {seller}</p>
            <p>Ratings: {ratings} stars</p>
            </div>
            <button className='btn-cart'>Add to cart</button>
        </div>
    );
};

export default Product;