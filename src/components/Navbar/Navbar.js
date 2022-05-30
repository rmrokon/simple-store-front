import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';
import CurrencyContext from '../../Context/CurrencyContext';





class Navbar extends Component {
    static contextType = CurrencyContext;
    render() {
        const handleCurrencyChange = this?.context.handleCurrencyChange;
        return (
            <div className='navBar'>
                <div>
                    <Link to={'/all'}>ALL</Link>
                    <Link to={'/clothes'}>CLOTHES</Link>
                    <Link to={'/tech'}>TECH</Link>
                </div>
                <div className=''>
                    <img src={shoppingBag} alt="" />
                </div>
                <div className='flex-items'>
                    <select onChange={(e) => handleCurrencyChange(e.target.value)} className='currencyOptions' name='currency'>
                        <option value="$">$</option>
                        <option value="£">£</option>
                        <option value="A$">A$</option>
                    </select>
                    <img src={shoppingCart} alt="" />
                </div>

            </div>
        );
    }
}



export default Navbar;