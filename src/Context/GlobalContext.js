import React, { Component } from "react";

const GlobalContext = React.createContext();

export class ContextProvider extends Component {
    state = {
        currency: "$",
        product: {},
        cart: [],
        order: {},
        colorSelected: '',
    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput })
    }

    handleAddToCart = (product) => {
        const { id } = product;
        const exists = this.state.cart.find(o => o.id === id);
        if (!exists) {
            const newOrder = {
                ...this.state.order,
                id,
                quantity: 1,
            }
            this.state.cart.push(newOrder);
        } else {
            const { id, quantity, ...rest } = exists
            if (JSON.stringify(this.state.order) === JSON.stringify(rest)) {
                const { quantity } = exists;
                exists.quantity = quantity + 1;

            } else {
                const newOrder = {
                    ...this.state.order,
                    id,
                    quantity: 1,
                }
                this.state.cart.push(newOrder);
            }
        }

    }

    handleProductDetails = (productClicked) => {
        this.setState({ product: productClicked })
    }

    handleSelectAttribute = (attribute, item) => {

        const { value } = item;
        const { name } = attribute;
        let attributeEntry = {};
        attributeEntry[name] = value;
        const newOrder = { ...this.state.order, ...attributeEntry }
        this.setState({ order: newOrder })
    }

    handleSelectColor = (colorId) => {
        const color = colorId;

        const newOrder = { ...this.state.order, color }
        this.setState({ order: newOrder })
        this.setState({ colorSelected: colorId })
    }

    render() {
        const { currency, order, colorSelected, cart } = this.state;
        const { handleCurrencyChange, handleAddToCart, handleProductDetails, handleSelectAttribute, handleSelectColor } = this;

        return (
            <GlobalContext.Provider value={{
                currency,
                order,
                colorSelected,
                cart,
                handleCurrencyChange,
                handleAddToCart,
                handleProductDetails,
                handleSelectAttribute,
                handleSelectColor
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;