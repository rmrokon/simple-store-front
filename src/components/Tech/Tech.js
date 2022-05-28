import request, { gql } from 'graphql-request';
import React, { Component } from 'react';
import SingleProductCard from '../SingleProductCard/SingleProductCard';

class Tech extends Component {
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
        const { providedData } = this.state;
        return (
            <div className='container'>
                <h1>Tech</h1>
                <div className='allProducts'>
                    {
                        providedData?.products?.map(product => <SingleProductCard product={product}></SingleProductCard>)
                    }
                </div>
            </div>
        );
    }
}

export default Tech;