import React, { Component } from 'react';
import './SingleProductCard.css';

class SingleProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencySymbol: "$"
        }
    }

    render() {
        const { name, prices, gallery } = this.props.product;
        const price = prices.find(p => p.currency.symbol === this.state.currencySymbol);
        return (
            <div className='productCard'>
                <div className='productImg'><img src={gallery[0]} alt="" /></div>
                <div>
                    <h3>{name}</h3>
                    <p>${price.amount}</p>
                </div>
            </div>
        );
    }
}

export default SingleProductCard;