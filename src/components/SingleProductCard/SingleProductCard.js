import React, { Component } from 'react';
import CurrencyContext from '../../Context/CurrencyContext';
import './SingleProductCard.css';
import addToCartBtn from '../../assets/addToCart.svg'

class SingleProductCard extends Component {
    static contextType = CurrencyContext;

    render() {
        const { currency } = this.context;
        const { name, prices, gallery } = this.props.product;
        const price = prices.find(p => p.currency.symbol === currency);
        return (
            <div className='productCard'>
                <div className=''>
                    <img id='productImg' src={gallery[0]} alt="" />
                    <div className='addToCartBtn'><img style={{ width: "15%" }} src={addToCartBtn} alt="" /></div>
                </div>

                <div>
                    <h3>{name}</h3>
                    <p><span>{currency}</span> {price.amount}</p>
                </div>
            </div>
        );
    }
}

export default SingleProductCard;