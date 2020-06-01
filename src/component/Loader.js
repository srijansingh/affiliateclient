import React, { Component } from 'react';
import "./Loader.css";
import Paper from "@material-ui/core/Paper"

export default class Loader extends Component {
    render() {

        const Loader = (
            <Paper elevation={2} className="l-product-item">
            <div className="l-image">
               
            </div>
            <div class="l-details">
                <span className="l-brand"></span>
                <span class="l-title"></span>
                <span className="l-rating"></span>
                <span className="l-price"></span>
                <span className="l-soldby"></span>
            </div>
        </Paper>
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
