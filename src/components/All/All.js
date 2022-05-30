import request, { gql } from 'graphql-request';
import React, { Component } from 'react';
import CurrencyContext from '../../Context/CurrencyContext';
import SingleProductCard from '../SingleProductCard/SingleProductCard';
import './All.css';

class All extends Component {
    static contextType = CurrencyContext;
    constructor(props) {
        super(props);
        this.state = {
            providedData: []
        }
        // this.getData = this.getData.bind(this);
    }
    getData() {
        const query = gql`
    {
      category(input: { title: "all" }) {     
        name
        products {
          id
          name
          gallery
          prices{
            currency{
              label
              symbol
            }
            amount
          }
        }
      }
    }
    `
        request('http://localhost:4000', query)
            .then(data => this.setState({ providedData: data.category }, () => {
                console.log("check this out", this.state.providedData)
            }))

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { currency } = this.context;
        const { providedData } = this.state;
        return (
            <div className='container'>
                <h1>All</h1>
                <div className='allProducts'>
                    {
                        providedData?.products?.map(product => <SingleProductCard product={product}></SingleProductCard>)
                    }
                </div>
            </div>
        );
    }
}

export default All;