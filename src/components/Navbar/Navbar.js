import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import shoppingBag from '../../assets/shoppingBag.svg';
import shoppingCart from '../../assets/shoppingCart.svg';
import CurrencyContext from '../../Context/CurrencyContext';
import request, { gql } from 'graphql-request';


class Navbar extends Component {
    static contextType = CurrencyContext;
    state = {
        categories: []
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
                console.log("check this out", this.state.categories)
            }))

    }

    componentDidMount() {
        this.getData();
    }
    render() {
        const handleCurrencyChange = this?.context.handleCurrencyChange;
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
                        {/* Need to make this options dynamic */}
                        <option value="$">$</option>
                        <option value="£">£</option>
                        <option value="A$">A$</option>
                    </select>
                    <img src={shoppingCart} alt="Your Cart" />
                </div>

            </div>
        );
    }
}



export default Navbar;