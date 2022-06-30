import React, { Component } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import './SelectAttributeDrawer.css';

class SelectAtrributeDrawer extends Component {
    static contextType = GlobalContext;
    render() {
        const { openDrawer, handleOpenDrawer, productOnDrawer, currency, handleSelectAttribute, handleSelectColor, colorSelected, handleAddToCart, order } = this.context;
        const { name, prices, inStock, attributes } = productOnDrawer;
        const price = prices?.find(p => p.currency.symbol === currency);
        console.log("select Opened")
        return (
            <div style={{ display: `${openDrawer ? "block" : "none"}` }} className='aside-drawer'>
                <button onClick={handleOpenDrawer}>X</button>

                <div className='select-Attributes'>
                    <h3>{name}</h3>
                    {
                        !inStock ? <h3 style={{ color: "red" }}>Stock Out</h3> : attributes?.map(a =>
                            <div key={a.id}>
                                <h3>{a.name}</h3>
                                <div className='attributeValues'>
                                    {
                                        a?.items?.map(item => a.type === "swatch" ? <button
                                            key={item.id}
                                            style={{
                                                backgroundColor: `${item.value}`,
                                                border: `${colorSelected === item.id ? "2px solid gray" : ""}`
                                            }}
                                            onClick={() => handleSelectColor(item.id)}
                                            className="swatch"
                                            disabled={!inStock}>
                                        </button>

                                            :

                                            <button
                                                key={item.id}
                                                style={{ backgroundColor: `${(Object.keys(order).includes(a.id) && order[a.id] === item.value) ? "black" : ""}`, color: `${(Object.keys(order).includes(a.id) && order[a.id] === item.value) ? "white" : ""}` }}
                                                onClick={() => handleSelectAttribute(a, item)} className='singleAttribute'>{item.value}
                                            </button>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                    <h3>Price</h3>
                    <p><span>{currency}</span> {price?.amount}</p>
                    <button onClick={() => handleAddToCart(productOnDrawer, price?.amount)} id='addToCartBtn' disabled={!inStock}>ADD TO CART</button>
                </div>
            </div>
        );
    }
}

export default SelectAtrributeDrawer;