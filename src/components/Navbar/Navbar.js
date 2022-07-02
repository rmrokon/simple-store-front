import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';
import GlobalContext from '../../Context/GlobalContext';
import request, { gql } from 'graphql-request';


class Navbar extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currencies: [],
            activeRoute: ""
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

    getCurrency() {
        const query = gql`
        {
            product(id: "jacket-canada-goosee") {
                id
                prices{
                    currency{
                      label
                      symbol
                    }
                  }
            }
        }
        `
        request('http://localhost:4000', query)
            .then(data => this.setState({ currencies: data.product.prices }, () => {
            }))
    }

    handleActiveRoute(route) {
        this.setState({ activeRoute: route })
    }

    componentDidMount() {
        this.getData();
        this.getCurrency();
    }

    render() {
        const { handleCurrencyChange, totalProductsOnCart, toggleCartOverlay, currency, toggleDropDown, openDropDown } = this.context;
        const { categories } = this.state;


        return (
            <div className='navBar'>
                <div>
                    {
                        categories.map((category, index) =>
                            <NavLink
                                onClick={() => this.handleActiveRoute(category.name)}
                                key={index} to={`/${category.name}`}
                                style={{
                                    color: `${(this.state.activeRoute === category.name) ? "rgba(94, 206, 123, 1)" : ""}`,
                                    textDecoration: `${(this.state.activeRoute === category.name) ? "underline" : ""}`
                                }}
                            >{category.name.toUpperCase()}</NavLink>
                        )
                    }
                </div>
                <div className=''>
                    <img src={shoppingBag} alt="" />
                </div>
                <div className='flex-items'>
                    <div className='selecCurrencyContainer'>
                        <div><span>{currency}</span><button className='currencySwitcherBtn' onClick={toggleDropDown}>
                            {
                                this.state.openDropDown ? <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 3.5L4 0.5L7 3.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                    :
                                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 0.5L4 3.5L7 0.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                            }


                        </button></div>
                        <ul style={{ display: `${openDropDown ? "block" : "none"}` }} className='currencyOptions'>
                            {
                                this.state.currencies.map((c, index) => <li onClick={() => handleCurrencyChange(c.currency.symbol)} key={index}>{c.currency.symbol} {c.currency.label}</li>)
                            }
                        </ul>
                    </div>
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