import request, { gql } from "graphql-request";
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
            openDrawer: false,
            productOnDrawer: {},
            openCartOverlay: false,
            productsOnCart: [],
            productQuantity: 1,
            total: 0,
            tax: 0,
            openDropDown: false,
            activeRoute: "",
        }
        // this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleActiveRoute = this.handleActiveRoute.bind(this);
        this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
        this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
        this.increaseQuantityAndPrice = this.increaseQuantityAndPrice.bind(this);
        this.decreaseQuantityAndPrice = this.decreaseQuantityAndPrice.bind(this);
        this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
        this.handleTotalProductsOnCart = this.handleTotalProductsOnCart.bind(this);
        this.calculateTax = this.calculateTax.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    handleActiveRoute(route) {
        this.setState({ activeRoute: route });
        this.setState({ openCartOverlay: false });
    }

    toggleDropDown() {
        this.setState({ openDropDown: !this.state.openDropDown });
    }

    calculateTax(totalAmount) {
        const totalTax = ((totalAmount * 21) / 100);
        this.setState({ tax: totalTax });
    }

    calculateTotalAmount(price, decrease = false) {
        if (!decrease) {
            const newTotal = (this.state.total + price);
            this.setState({ total: newTotal });
            this.calculateTax(newTotal)
        }
        if (decrease) {
            const newTotal = (this.state.total - price);
            this.setState({ total: newTotal });
            this.calculateTax(newTotal)
        }

    }

    handleTotalProductsOnCart(decrease = false) {
        if (!decrease) {
            const newNumOfProducts = this.state.totalProductsOnCart + 1;
            this.setState({ totalProductsOnCart: newNumOfProducts });
        }
        if (decrease) {
            const newNumOfProducts = this.state.totalProductsOnCart - 1;
            this.setState({ totalProductsOnCart: newNumOfProducts });
        }
    }

    increaseQuantityAndPrice(product, price) {
        const { quantity, ...rest } = product.selectedAtrributes;
        const newQuantity = quantity + 1;
        product.selectedAtrributes = { ...rest, quantity: newQuantity };
        this.setState({ productQuantity: newQuantity })

        const newTotalProductsOnCart = this.state.totalProductsOnCart + 1;
        this.setState({ totalProductsOnCart: newTotalProductsOnCart });

        this.calculateTotalAmount(price);
        this.handleTotalProductsOnCart();

    }

    decreaseQuantityAndPrice(product, price) {
        if (product.selectedAtrributes.quantity > 1) {
            const { quantity, ...rest } = product.selectedAtrributes;
            const newQuantity = quantity - 1;
            product.selectedAtrributes = { ...rest, quantity: newQuantity };
            const newTotalProductsOnCart = this.state.totalProductsOnCart - 1;
            this.setState({ totalProductsOnCart: newTotalProductsOnCart })
            this.setState({ productQuantity: newQuantity });
            this.calculateTotalAmount(price, true);
            this.handleTotalProductsOnCart(true);

        }
    }

    toggleCartOverlay() {
        this.setState({ openCartOverlay: !this.state.openCartOverlay })
    }

    handleOpenDrawer(product) {
        this.setState({ productOnDrawer: product })
        this.setState({ openDrawer: !this.state.openDrawer })
    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput });
        this.setState({ openDropDown: !this.state.openDropDown })
    }

    // Adding product to the cart

    handleAddToCart = (product, price) => {
        if (this.state.productOnDrawer.attributes.length !== Object.keys(this.state.order).length) {
            return alert("Choose your varient first");
        }
        else {
            const { id } = product;
            let orderWithSameAttributes;
            const existingOrdersOfTheProduct = this.state.productsOnCart.filter(o => o.id === id);
            console.log("this is existingOrdersOfTheProduct", existingOrdersOfTheProduct)
            if (existingOrdersOfTheProduct) {
                orderWithSameAttributes = existingOrdersOfTheProduct.find(order => {
                    console.log("Order:", order);
                    console.log("Order on State:", this.state.order);
                    const { id, quantity, ...rest } = order.selectedAtrributes;
                    return JSON.stringify(this.state.order) === JSON.stringify(rest);
                })
            }

            console.log("this is orderwithsame atto", orderWithSameAttributes)




            if (!orderWithSameAttributes) {
                this.calculateTotalAmount(price);
                const newOrder = {
                    ...this.state.order,
                    id,
                    quantity: 1,
                }
                const _id = Math.floor(Math.random() * 1000);
                const productWithSelectedAtrributes = { ...product, _id, selectedAtrributes: newOrder }
                let orderedProducts = [...this.state.productsOnCart, productWithSelectedAtrributes];
                console.log("this is ordered products", orderedProducts);
                this.setState({ productsOnCart: orderedProducts });
                this.setState({ order: {} });
                this.handleTotalProductsOnCart();

            } else {
                alert("Product with the same attributes already added to the cart!");
                this.setState({ order: {} });
            }
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



    render() {
        const { currency, order, colorSelected, cart, totalProductsOnCart, openDrawer, productOnDrawer, openCartOverlay, productsOnCart, productQuantity, total, tax, openDropDown, activeRoute } = this.state;

        const { handleCurrencyChange, handleAddToCart, handleProductDetails, handleSelectAttribute, handleSelectColor, getCart, handleOpenDrawer, toggleCartOverlay, increaseQuantityAndPrice, decreaseQuantityAndPrice, calculateTax, toggleDropDown, handleActiveRoute } = this;

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
                getCart,
                handleOpenDrawer,
                openDrawer,
                productOnDrawer,
                toggleCartOverlay,
                openCartOverlay,
                productsOnCart,
                productQuantity,
                total,
                increaseQuantityAndPrice,
                decreaseQuantityAndPrice,
                tax,
                calculateTax,
                toggleDropDown,
                openDropDown,
                handleActiveRoute,
                activeRoute,
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;