import React, { Component } from 'react'
import GlobalContext from '../../Context/GlobalContext';
import CartOverlay from '../CartOverlay/CartOverlay';
import SingleProductOnCart from '../SingleProductOnCart/SingleProductOnCart';
import './CartPage.css';

export default class CartPage extends Component {
    static contextType = GlobalContext;

    render() {
        const { productsOnCart, total, currency, tax, totalProductsOnCart } = this.context;
        return (
            <div style={{ padding: "5%" }}>
                <h3>CART</h3>
                <div>
                    {
                        productsOnCart.map(p => <div className='singleProductOnCartPage' key={p._id}><SingleProductOnCart p={p} carousel={true}></SingleProductOnCart></div>)
                    }
                    <div className='totalAmountSection'>
                        <p>Tax 21%: <span className='boldText'>{currency}{tax.toFixed(2)}</span></p>
                        <p>Quantity: <span className='boldText'>{totalProductsOnCart}</span></p>
                        <p>Total: <span className='boldText'>{currency}{total}</span></p>
                        <button className='orderBtn'>ORDER</button>
                    </div>
                </div>
            </div>
        )
    }
}
