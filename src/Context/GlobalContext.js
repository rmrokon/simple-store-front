import React, { Component } from "react";

const GlobalContext = React.createContext();

export class ContextProvider extends Component {
    state = {
        currency: "$",
        product: {},
        cart: []
    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput })
    }

    handleAddToCart = (id) => {

    }

    handleProductDetails = (productClicked) => {
        this.setState({ product: productClicked })
    }

    render() {
        const { currency } = this.state;
        const { handleCurrencyChange, handleAddToCart, handleProductDetails } = this;

        return (
            <GlobalContext.Provider value={{
                currency,
                handleCurrencyChange,
                handleAddToCart,
                handleProductDetails
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;