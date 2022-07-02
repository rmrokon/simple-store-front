import request, { gql } from 'graphql-request';
import React, { Component } from 'react';
import GlobalContext from '../../Context/GlobalContext';
import CartOverlay from '../CartOverlay/CartOverlay';
import SelectAtrributeDrawer from '../SelectAtrributeDrawer/SelectAtrributeDrawer';
import SingleProductCard from '../SingleProductCard/SingleProductCard';

class Tech extends Component {
    static contextType = GlobalContext;
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
      category(input: { title: "tech" }) {     
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
            .then(data => this.setState({ providedData: data.category }, () => {
                console.log("check this out", this.state.providedData)
            }))

    }

    componentDidMount() {
        this.getData();
    }
    render() {
        const { openCartOverlay } = this.context;
        const { providedData } = this.state;
        return (
            <div className='container'>
                <h1 style={{ marginLeft: "2%" }}>Tech</h1>
                <div className='allProducts'>

                    {
                        providedData?.products?.map(product => <SingleProductCard product={product}></SingleProductCard>)
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

export default Tech;