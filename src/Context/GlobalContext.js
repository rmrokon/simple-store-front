import React, { Component } from "react";

const GlobalContext = React.createContext();

export class ContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: "$",
            product: {},
            cart: [],
            order: {},
            colorSelected: '',
            totalProductsOnCart: 0,
        }

    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput })
    }

    // Adding product to the cart

    handleAddToCart = (product) => {
        console.log("this is order", this.state.order);
        console.log("this is cart", this.state.cart);
        const { id } = product;
        let orderWithSameAttributes;
        const existingOrdersOfTheProduct = this.state.cart.filter(o => o.id === id);

        if (existingOrdersOfTheProduct) {
            orderWithSameAttributes = existingOrdersOfTheProduct.find(order => {
                const { id, quantity, ...rest } = order;
                return JSON.stringify(this.state.order) === JSON.stringify(rest);
            })
        }

        console.log("this is orderwithsame atto", orderWithSameAttributes)

        if (!orderWithSameAttributes) {
            const newOrder = {
                ...this.state.order,
                id,
                quantity: 1,
            }
            const newCart = [...this.state.cart, newOrder]
            console.log("this is newcart", newCart)
            this.setState({ cart: newCart });
            this.calculateTotalProductOnCart(newCart);
        } else {
            alert("Product with the same attributes already added to the cart!");
        }

    }
    handleProductDetails = (productClicked) => {
        this.setState({ product: productClicked })
    }

    // Selecting attribute except color

    handleSelectAttribute = (attribute, item) => {

        const { value } = item;
        const { name } = attribute;
        let attributeEntry = {};
        attributeEntry[name] = value;
        const newOrder = { ...this.state.order, ...attributeEntry }
        this.setState({ order: newOrder })
        const newAttributeSelection = { ...this.state.attributeSelected, ...attributeEntry }
        this.setState({ attributeSelected: newAttributeSelection })
    }

    // Selecting color attribute

    handleSelectColor = (colorId) => {
        const color = colorId;
        const newOrder = { ...this.state.order, color }
        this.setState({ order: newOrder })
        this.setState({ colorSelected: colorId })
    }


    calculateTotalProductOnCart = (cart) => {
        let quantity = 0;
        cart?.map(order => quantity += order.quantity)
        this.setState({ totalProductsOnCart: quantity });
    }

    render() {
        const { currency, order, colorSelected, cart, totalProductsOnCart } = this.state;
        const { handleCurrencyChange, handleAddToCart, handleProductDetails, handleSelectAttribute, handleSelectColor, getCart } = this;

        return (
            <GlobalContext.Provider value={{
                currency,
                order,
                colorSelected,
                cart,
                totalProductsOnCart,
                handleCurrencyChange,
                handleAddToCart,
                handleProductDetails,
                handleSelectAttribute,
                handleSelectColor,
                getCart
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;