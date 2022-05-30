import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';

class Navbar extends Component {
    render() {
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
                    <select className='currencyOptions'>
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