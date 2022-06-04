import React, { Component } from "react";

const GlobalContext = React.createContext();

export class ContextProvider extends Component {
    state = {
        currency: "$",
        product: {},
        cart: [],
        order: {},
        colorSelected: '',
        attributeSelected: '',
        totalProductsOnCart: 0
    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput })
    }

    handleAddToCart = (product) => {
        const { id } = product;
        const existingOrdersOfTheProduct = this.state.cart.filter(o => o.id === id);
        const orderWithSameAttributes = existingOrdersOfTheProduct.find(order => {
            const { id, quantity, ...rest } = order;
            return JSON.stringify(this.state.order) === JSON.stringify(rest);
        })

        if (!orderWithSameAttributes) {
            const newOrder = {
                ...this.state.order,
                id,
                quantity: 1,
            }
            this.state.cart.push(newOrder);
        } else {
            alert("Product with the same attributes already added to the cart!");
        }

        this.calculateTotalProductOnCart();

    }

    handleProductDetails = (productClicked) => {
        this.setState({ product: productClicked })
    }

    handleSelectAttribute = (attribute, item) => {

        const { value, id } = item;
        const { name } = attribute;
        let attributeEntry = {};
        attributeEntry[name] = value;
        const newOrder = { ...this.state.order, ...attributeEntry }
        this.setState({ order: newOrder })
        this.setState({ attributeSelected: id })
    }

    handleSelectColor = (colorId) => {
        const color = colorId;

        const newOrder = { ...this.state.order, color }
        this.setState({ order: newOrder })
        this.setState({ colorSelected: colorId })
    }

    calculateTotalProductOnCart = () => {
        let quantity = 0;
        const { cart } = this.state;
        cart.map(order => quantity += order.quantity)
        this.setState({ totalProductsOnCart: quantity })
    }

    render() {
        const { currency, order, colorSelected, cart, attributeSelected, totalProductsOnCart } = this.state;
        const { handleCurrencyChange, handleAddToCart, handleProductDetails, handleSelectAttribute, handleSelectColor, calculateTotalProductOnCart } = this;

        return (
            <GlobalContext.Provider value={{
                currency,
                order,
                colorSelected,
                cart,
                attributeSelected,
                totalProductsOnCart,
                handleCurrencyChange,
                handleAddToCart,
                handleProductDetails,
                handleSelectAttribute,
                handleSelectColor,
                calculateTotalProductOnCart
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;