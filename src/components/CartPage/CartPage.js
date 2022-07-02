import React, { Component } from 'react'
import GlobalContext from '../../Context/GlobalContext';
import SingleProductOnCart from '../SingleProductOnCart/SingleProductOnCart';
import './CartPage.css';

export default class CartPage extends Component {
    static contextType = GlobalContext;

    render() {
        const { productsOnCart, total, currency, tax, totalProductsOnCart } = this.context;
        return (
            <div style={{ padding: "5%" }}>
                <h3 className='bold-title'>CART</h3>
                <div>
                    {
                        productsOnCart.map(p => <div className='singleProductOnCartPage' key={p._id}><SingleProductOnCart p={p} carousel={true}></SingleProductOnCart></div>)
                    }
                    <div className='totalAmountSection'>
                        <p className='title'>Tax 21%: <span className='boldText'>{currency}{tax.toFixed(2)}</span></p>
                        <p className='title'>Quantity: <span className='boldText'>{totalProductsOnCart}</span></p>
                        <p className='title'>Total: <span className='boldText'>{currency}{total.toFixed(2)}</span></p>
                        <button className='orderBtn'>ORDER</button>
                    </div>
                </div>
            </div>
        )
    }
}
