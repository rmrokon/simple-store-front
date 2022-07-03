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
                {
                    productsOnCart.length > 0 ? <div>
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

                        :

                        <div style={{ textAlign: "center", marginTop: "50%", marginBottom: "25%" }}>
                            <h3 className='title'>YOUR BAG IS EMPTY!</h3>
                            <h3 className='title'>PUT SOMETHING IN IT...</h3>
                        </div>
                }
            </div>
        );
    }
}

export default CartOverlay;