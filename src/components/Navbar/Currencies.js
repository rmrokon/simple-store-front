import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GlobalContext from '../../Context/GlobalContext';

export default class Currencies extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            console.log("inside new function")
            if (this.context.openDropDown) {
                this.context.toggleDropDown();
            }
        }
    }

    render() {
        const { openDropDown, handleCurrencyChange } = this.context;
        return (
            <ul ref={this.wrapperRef} style={{ display: `${openDropDown ? "block" : "none"}` }} className='currencyOptions'>
                {
                    this.props.currencies.map((c, index) => <li className='title' onClick={() => handleCurrencyChange(c.currency.symbol)} key={index}>{c.currency.symbol} {c.currency.label}</li>)
                }
            </ul>
        )
    }
}
