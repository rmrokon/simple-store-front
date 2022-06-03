import request, { gql } from 'graphql-request';
import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import GlobalContext from '../../Context/GlobalContext';
import './ProductDescription.css';
import parse from 'html-react-parser';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleProduct: {},
            displayImage: 0
        };
    }
    static contextType = GlobalContext;

    getData = (id) => {
        const query = gql`
    {
        product(id: "${id}") {
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
            description
        }
    }
    `
        request('http://localhost:4000', query)
            .then(data => this.setState({ singleProduct: data.product }))
    }

    componentDidMount() {
        const { id } = this.props.params;
        this.getData(id);
    }

    render() {

        const { name, gallery, prices, inStock, attributes, description } = this.state.singleProduct;
        const { displayImage } = this.state;
        const { currency } = this.context;
        const price = prices?.find(p => p.currency.symbol === currency);

        return (
            <div className='productDescription'>

                <div className='imageContainer'>
                    <div className='flexSmallImages'>
                        {
                            gallery?.map((imgUrl, index) => <img key={index} src={imgUrl} alt=''></img>)
                        }
                    </div>
                    <div className='fullImageContainer'>
                        {gallery && <img id='fullImage' src={gallery[displayImage]} alt="" />}
                    </div>
                </div>
                <div>
                    <h3>This is : {name}</h3>
                    <h3>This is : {inStock ? "Available" : "Out of stock"}</h3>
                    {
                        attributes?.map(a =>
                            <div key={a.id}>
                                <h3>{a.name}</h3>
                                <div className='attributeValues'>
                                    {
                                        a?.items?.map(item => a.type === "swatch" ? <div style={{ backgroundColor: `${item.value}` }} className='swatch'></div> : <p key={item.id} className='singleAttribute'>{item.value}</p>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                    <h3>Price</h3>
                    <p><span>{currency}</span> {price?.amount}</p>
                    <button id='addToCartBtn'>ADD TO CART</button>
                    <div>
                        {
                            parse(`${description}`)
                        }
                    </div>
                </div>



            </div>
        )
    }
}

export default withParams(ProductDescription);
