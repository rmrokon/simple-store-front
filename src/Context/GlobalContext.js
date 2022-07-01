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
            openDropDown: false
        }
        this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
        this.toggleCartOverlay = this.toggleCartOverlay.bind(this);
        this.increaseQuantityAndPrice = this.increaseQuantityAndPrice.bind(this);
        this.decreaseQuantityAndPrice = this.decreaseQuantityAndPrice.bind(this);
        this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
        this.handleTotalProductsOnCart = this.handleTotalProductsOnCart.bind(this);
        this.calculateTax = this.calculateTax.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    toggleDropDown() {
        this.setState({ openDropDown: !this.state.openDropDown })
    }

    calculateTax(totalAmount) {
        const totalTax = (totalAmount * 21) / 100;
        this.setState({ tax: totalTax });
    }

    calculateTotalAmount(price, decrease = false) {
        if (!decrease) {
            const newTotal = this.state.total + price;
            this.setState({ total: newTotal });
            this.calculateTax(newTotal)
        }
        if (decrease) {
            const newTotal = this.state.total - price;
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
            this.calculateTotalAmount(price);
            const newOrder = {
                ...this.state.order,
                id,
                quantity: 1,
            }
            const newCart = [...this.state.cart, newOrder]
            console.log("this is newcart", newCart)
            this.setState({ cart: newCart });
            const _id = Math.floor(Math.random() * 1000);
            const productWithSelectedAtrributes = { ...product, _id, selectedAtrributes: newOrder }
            let orderedProducts = [...this.state.productsOnCart, productWithSelectedAtrributes];
            console.log("this is ordered products", orderedProducts);
            this.setState({ productsOnCart: orderedProducts });
            this.setState({ order: {} });
            this.handleTotalProductsOnCart();

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

    render() {
        const { currency, order, colorSelected, cart, totalProductsOnCart, openDrawer, productOnDrawer, openCartOverlay, productsOnCart, productQuantity, total, tax, openDropDown } = this.state;

        const { handleCurrencyChange, handleAddToCart, handleProductDetails, handleSelectAttribute, handleSelectColor, getCart, handleOpenDrawer, toggleCartOverlay, increaseQuantityAndPrice, decreaseQuantityAndPrice, calculateTax, toggleDropDown } = this;

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
                openDropDown
            }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export default GlobalContext;