import React, { Component } from "react";

const CurrencyContext = React.createContext();

export class CurrencyProvider extends Component {
    state = {
        currency: "$"
    }

    handleCurrencyChange = (currencyInput) => {
        this.setState({ currency: currencyInput })
    }

    render() {
        const { currency } = this.state;
        const { handleCurrencyChange } = this;

        return (
            <CurrencyContext.Provider value={{ currency, handleCurrencyChange }}>
                {this.props.children}
            </CurrencyContext.Provider>
        )
    }
}

export default CurrencyContext;