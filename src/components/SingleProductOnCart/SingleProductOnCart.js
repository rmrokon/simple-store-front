import React, { Component } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import Carousel from '../Carousel/Carousel';
import './SingleProductOnCart.css'

class SingleProductOnCart extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }

    }

    render() {
        const { carousel } = this.props;
        const { name, prices, gallery, attributes, selectedAtrributes } = this.props.p;
        const { currency, increaseQuantityAndPrice, decreaseQuantityAndPrice } = this.context;
        const price = prices?.find(p => p.currency.symbol === currency);
        return (
            <div className='singleProductOnCartContainer'>
                <div>
                    <h3 style={{ fontSize: "16px" }}>{name}</h3>
                    <p>{currency}{price?.amount}</p>
                    <div>
                        {
                            attributes?.map(a =>
                                <div key={a.id}>
                                    <h4 style={{ fontSize: "14px", fontWeight: "400" }}>{a.name}</h4>
                                    <div className='attributeValues'>
                                        {
                                            a?.items?.map(item => a.type === "swatch" ? <button
                                                key={item.id}
                                                style={{
                                                    backgroundColor: `${item.value}`,
                                                    border: `${selectedAtrributes.color === item.id ? "2px solid gray" : ""}`
                                                }}
                                                className="swatch"
                                            >
                                            </button>

                                                :

                                                <button
                                                    key={item.id}
                                                    style={{ backgroundColor: `${(selectedAtrributes[a.id] === item.value) ? "black" : ""}`, color: `${(selectedAtrributes[a.id] === item.value) ? "white" : ""}` }}
                                                    className='singleAttribute'>{item.value}
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <div className='quantityControlContainer'>
                        <div><button onClick={() => increaseQuantityAndPrice(this.props.p, price?.amount)}>+</button></div>
                        <div><span>{selectedAtrributes.quantity}</span></div>
                        <div><button onClick={() => decreaseQuantityAndPrice(this.props.p, price?.amount)}>-</button></div>
                    </div>
                    {
                        carousel ? <Carousel gallery={gallery}></Carousel>
                            :
                            <div style={{ width: "110px", height: "170px", display: "flex", alignItems: "center" }}>
                                <img width={"100%"} src={gallery[0]} alt="" />
                            </div>
                    }
                </div>


            </div>
        );
    }
}

export default SingleProductOnCart;