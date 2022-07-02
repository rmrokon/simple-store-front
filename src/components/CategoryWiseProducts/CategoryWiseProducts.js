import request, { gql } from 'graphql-request';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../../Context/GlobalContext';
import CartOverlay from '../CartOverlay/CartOverlay';
import SelectAtrributeDrawer from '../SelectAtrributeDrawer/SelectAtrributeDrawer';
import SingleProductCard from '../SingleProductCard/SingleProductCard';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CategoryWiseProducts extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            providedData: {},
        }
    }
    getData(category) {
        const query = gql`
    {
      category(input: { title: "${category}" }) {      
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
            }))

    }

    componentDidMount() {
        const { categoryName } = this.props.params;

        this.getData(categoryName);
        console.log("this is props", this.props);
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getData(this.props.params.categoryName);
        }
    }

    render() {
        const { providedData } = this.state;
        const { name, products } = providedData;
        const { openCartOverlay } = this.context;

        console.log("this is data:", providedData, typeof providedData);

        return (
            <div className='container'>
                <h1 style={{ marginBottom: "5%" }} className='title'>{name?.toUpperCase()}</h1>
                <div className='allProducts'>
                    {
                        products?.map(product => <SingleProductCard product={product}></SingleProductCard>)
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

export default withParams(CategoryWiseProducts);