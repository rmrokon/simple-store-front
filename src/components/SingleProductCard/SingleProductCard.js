import React, { Component } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import './SingleProductCard.css';
import addToCartBtn from '../../assets/addToCart.svg'
import { Link } from 'react-router-dom';

class SingleProductCard extends Component {

    static contextType = GlobalContext;

    render() {
        const { name, prices, gallery, id, inStock } = this.props.product;
        const { currency, handleOpenDrawer } = this.context;
        const price = prices.find(p => p.currency.symbol === currency);
        return (
            <div className='productCard'>
                <div className=''>
                    <img id='productImg' src={gallery[0]} alt="" />
                    <div style={{ display: `${!inStock ? "block" : ""}` }} className='outOfStock'><p>Out of Stock</p></div>
                    <div
                        onClick={() => handleOpenDrawer(this.props.product)}
                        className='addToCartBtn'
                        style={{ visibility: `${!inStock ? "hidden" : ""}` }}
                    ><img style={{ width: "15%" }} src={addToCartBtn} alt="" /></div>
                </div>

                <div>
                    <Link to={`/productDescription/${id}`}> <h3 style={{ marginTop: "0", marginBottom: "0" }}>{name}</h3></Link>
                    <p style={{ marginTop: "0", marginBottom: "1%" }}><span>{currency}</span> {price.amount}</p>
                </div>

            </div>
        );
    }
}

export default SingleProductCard;