import React, { Component } from 'react'
import GlobalContext from '../../Context/GlobalContext';
import './Carousel.css';

export default class Carousel extends Component {
    // static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
        this.showPreviousImage = this.showPreviousImage.bind(this);
        this.showNextImage = this.showNextImage.bind(this);
    }

    showPreviousImage() {
        if (this.state.activeIndex > 0) {
            const newIndex = this.state.activeIndex - 1;
            this.setState({ activeIndex: newIndex });
        } else {
            const newIndex = this.props.gallery.length - 1;
            this.setState({ activeIndex: newIndex });
        }
    }
    showNextImage() {
        if (this.state.activeIndex < (this.props.gallery.length - 1)) {
            const newIndex = this.state.activeIndex + 1;
            this.setState({ activeIndex: newIndex });
        }
        else {
            this.setState({ activeIndex: 0 });
        }
    }
    render() {
        const { gallery } = this.props;
        return (
            <div className='carouselContainer'>
                <img width={"100%"} src={gallery[this.state.activeIndex]} alt="" />

                <div className='carouselBtns'>
                    <button onClick={this.showPreviousImage}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>

                    <button onClick={this.showNextImage}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </button>
                </div>
            </div>
        )
    }
}
