import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>

                <Link to={'/all'}>ALL</Link>
                <Link to={'/clothes'}>CLOTHES</Link>
                <Link to={'/tech'}>TECH</Link>
            </div>
        );
    }
}

export default Navbar;