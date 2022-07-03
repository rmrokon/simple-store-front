import request, { gql } from 'graphql-request';
import React, { Component } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import CartOverlay from '../CartOverlay/CartOverlay';
import SelectAtrributeDrawer from '../SelectAtrributeDrawer/SelectAtrributeDrawer';
import SingleProductCard from '../SingleProductCard/SingleProductCard';
import './All.css';

class All extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            providedData: [],

        }
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
          inStock
            attributes{
                id
                name
                type
                items{
                    displayValue
                    value
                    id
                }
            }
        }
      }
    }
    `
        request('http://localhost:4000', query)
            .then(data => this.setState({ providedData: data.category }))

    }



    componentDidMount() {
        this.getData();
    }

    render() {
        const { providedData } = this.state;
        const { openCartOverlay } = this.context;
        return (
            <div className='container'>
                <h1 className='title'>ALL</h1>
                <div className='allProducts'>
                    {
                        providedData?.products?.map(product => <SingleProductCard key={product.id} product={product}></SingleProductCard>)
                    }
                </div>
                <SelectAtrributeDrawer></SelectAtrributeDrawer>
                <div style={{ display: `${openCartOverlay ? "block" : "none"}` }} className='overlayContainer'>
                    <CartOverlay></CartOverlay>
                </div>
            </div>
        );
    }
}

export default All;