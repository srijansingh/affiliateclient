import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import AmazonLogo from "../../../util/amazon.png"
import "./product.css";


export default class Product extends Component {
    constructor(){
        super();
        this.state={
            flipkart:[],
            isLoading:true,
           
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true,
            
        })
        console.log("Product"+this.props.searchItem)
        fetch('http://localhost:8080/user/compare/product', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body : JSON.stringify({searchItem:this.props.searchItem})
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
                console.log(response)
                this.setState({
                    flipkart: response,
                    isLoading:false
            })
        })
        .catch(err => {
            this.setState({
                errorMessage:true,
                isLoading:false
            })
        })
    }
   
    render() {
        return (
            
            <div className="single-product">
            <div className="single-image-list">
                <div className="full-image">
                   <div className="full-image-element">
                       <img src={this.props.image} alt={this.props.title} />
                   </div>
                </div>
            </div>
            <div className="product-container">
                <div className="product-details">
                    <span className="title">{this.props.title}</span>
                    <span className="brand">{this.props.brand}</span>
                    <span className="rating">{this.props.rating}</span>
                    <span className="price">{this.props.price}</span>
                    <span className="description">
                        <span style={{fontWeight:'bold', fontSize:'1rem',padding:'0.5rem 0'}}>Product Description</span>
                        <span style={{fontSize:'0.8rem', lineSpacing:'10px'}}>{this.props.description}</span>
                    </span>    
                </div>
                <div>
                    <Paper elevation={2} style={{width:'200px',padding:'0.5rem',display:'flex', flexWrap:'wrap'}}>
                        <div className="amazon-logo">
                            <img src={AmazonLogo} alt="amazon"/>
                        </div>
                        <Button href={this.props.link} target="_blank" variant="contained" style={{background:'blue',color:'white',width:'100%'}}>Buy at {this.props.price} </Button>
                    </Paper>
                </div>
            </div>
          
        </div>
          
       
        )
    }
}