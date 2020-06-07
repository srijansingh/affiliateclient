import React, { Component } from 'react';
import "./Loader.css";


export default class Loader extends Component {
    render() {

        const Loader = (
            <div elevation={2} className="l-product-item">
            <div className="l-image">
               
            </div>
            <div class="l-details">
                <span className="l-brand"></span>
                <span class="l-title"></span>
                <span className="l-rating"></span>
                <span className="l-price"></span>
                <span className="l-soldby"></span>
            </div>
        </div>
        )
        return (
            <div className="l-container">
               {Loader}
                {Loader}
                {Loader}
                
            </div>
        )
    }
}
