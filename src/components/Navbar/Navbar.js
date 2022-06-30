import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';
import GlobalContext from '../../Context/GlobalContext';
import request, { gql } from 'graphql-request';
import CartOverlay from '../CartOverlay/CartOverlay';


class Navbar extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }

    }

    getData() {
        const query = gql`
        {
            categories {
              name
            }
          }
    `
        request('http://localhost:4000', query)
            .then(data => this.setState({ categories: data.categories }, () => {
            }))
    }

    componentDidMount() {
        this.getData();
    }


    render() {
        const { handleCurrencyChange, totalProductsOnCart, toggleCartOverlay } = this.context;
        const { categories } = this.state;


        return (
            <div className='navBar'>
                <div>
                    {
                        categories.map((category, index) =>
                            <Link key={index} to={`/${category.name}`}>{category.name.toUpperCase()}</Link>
                        )
                    }
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
                    <div onClick={toggleCartOverlay}>
                        <small id='cart-length'>{totalProductsOnCart}</small>
                        <img src={shoppingCart} alt="Your Cart" />
                    </div>
                </div>
            </div>
        );
    }
}



export default Navbar;