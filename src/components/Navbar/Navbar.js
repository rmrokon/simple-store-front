import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';
import GlobalContext from '../../Context/GlobalContext';
import request, { gql } from 'graphql-request';
import Currencies from './Currencies';


class Navbar extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currencies: [],
            // activeRoute: ""
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

    // handleActiveRoute(route) {
    //     this.setState({ activeRoute: route })
    // }

    componentDidMount() {
        this.getData();
        this.getCurrency();
    }

    render() {
        const { totalProductsOnCart, toggleCartOverlay, handleActiveRoute, activeRoute } = this.context;
        const { categories } = this.state;


        return (
            <div className='navBar'>
                <div>
                    {
                        categories.map((category, index) =>
                            <NavLink
                                className={"title"}
                                onClick={() => handleActiveRoute(category.name)}
                                key={index} to={`/${category.name}`}
                                style={{
                                    color: `${(activeRoute === category.name) ? "rgba(94, 206, 123, 1)" : ""}`,
                                    textDecoration: `${(activeRoute === category.name) ? "underline" : ""}`
                                }}
                            >{category.name.toUpperCase()}</NavLink>
                        )
                    }
                </div>
                <div className=''>
                    <img src={shoppingBag} alt="" />
                </div>
                <div className='flex-items'>
                    <div className='selectCurrencyContainer'>
                        <Currencies currencies={this.state.currencies}></Currencies>
                    </div>
                    <div onClick={toggleCartOverlay}>
                        {totalProductsOnCart > 0 && <small id='cart-length'>{totalProductsOnCart}</small>}
                        <img src={shoppingCart} alt="Shopping Cart" />
                    </div>
                </div>
            </div>
        );
    }
}



export default Navbar;