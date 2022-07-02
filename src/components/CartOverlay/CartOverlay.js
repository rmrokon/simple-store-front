import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../Context/GlobalContext';
import SingleProductOnCart from '../SingleProductOnCart/SingleProductOnCart';
import './CartOverlay.css';

class CartOverlay extends Component {
    static contextType = GlobalContext;

    render() {
        const { productsOnCart, total, currency } = this.context;

        return (
            <div className='cartOverlay'>
                <h3 className='bold-title'>My Bag<span className='bold-title'>, {productsOnCart.length} items</span></h3>
                <div>
                    {
                        productsOnCart.map(p => <SingleProductOnCart key={p._id} p={p}></SingleProductOnCart>)
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "Roboto", fontWeight: "700" }}>Total</div>
                    <div style={{ fontFamily: "Roboto", fontWeight: "700" }}>{currency}{total?.toFixed(2)}</div>
                </div>
                <div className='cartOverlayBtnsContainer'>
                    <Link to={'/cartPage'}><button className='cartOverlayBtns viewBagBtn'>VIEW BAG</button></Link>
                    <button className='cartOverlayBtns checkOutBtn'>CHECK OUT</button>
                </div>
            </div>
        );
    }
}

export default CartOverlay;