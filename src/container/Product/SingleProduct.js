import React, { Component } from 'react'
import Product from './component/Product'
import Paper from "@material-ui/core/Paper"
import AmazonLogo from "../../util/flipkart.png"
import "./singleproduct.css";

export default class SingleProduct extends Component {
     constructor(){
        super()
        this.state = {
            isLoading :false,
            product :[],
            title:null,
            brand:null,
            rating:null,
            price:null,
            image:null,
            description:null,
            link:null,
            flipkart:[],
            isBrandLoading:false,
            errorBrandMessage:false,

            errorMessage : false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })

        fetch('https://warm-scrubland-66696.herokuapp.com/user/product/'+this.props.match.params._id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
                console.log(response.post)
                this.setState({
                    product : response.post,
                    title:response.post.title,
                    brand:response.post.brand,
                    rating:response.post.rating,
                    price:response.post.price,
                    description:response.post.description,
                    image:response.post.image,
                    link:response.post.link,
                    searchItem:response.post.title.substring(0,25),

                    isLoading:false
            })

        
            fetch('https://warm-scrubland-66696.herokuapp.com/user/compare/product', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({searchItem:this.state.title.substring(0,25)})
                })
                .then(res => {
                    if(res.status !==200){
                        throw new Error('Failed to fetch the product')
                    }
                    return res.json()
                })
                .then(response => {
                    console.log(response.post)
                    this.setState({
                        flipkart: response.post,
                        isLoading:false
                    })  
                })
               
                   


            
                })
                .catch(err => {
                    this.setState({
                        errorMessage:true,
                        isLoading:false
                })
            })


                // Dont

                


        
    }




    render() {
       
       const item =  this.state.flipkart.filter(data => {
            if(data.title.includes(this.state.title.substring(0,20))){
                return data;
            }
            else{
                return null;
            }
        })
        .map((data, index) => {
            console.log(data.title)
            return (
                <div key={index} style={{margin:'20px'}}>
                    <Paper elevation={2} style={{width:'200px',padding:'0.5rem',display:'flex', flexWrap:'wrap'}}>
                        
                        <div style={{fontSize:'15px'}}>{data.title}</div>
                        <div style={{fontSize:'20px',color:'blue', fontWeight:'bold'}}>{data.price}</div>
                        <div className="amazon-logo">
                            <img src={AmazonLogo} alt="Flipkart"/>
                        </div>
                    </Paper>
                </div>
            )
        })



       

        

       

        return (
            <div>
                    <Product  
                        title={this.state.title}
                        brand = {this.state.brand}
                        price={this.state.price}
                        rating={this.state.rating}
                        link={this.state.link}
                        description={this.state.description}
                        image={this.state.image}
                        loading={this.state.isLoading}


                    />
                   <div style={{display:'flex', flexDirection:'row',justifyContent:'space-around', marginTop:'2rem'}}>
                        <div style={{display:'flex',flexWrap:'wrap'}}>
                            {item}
                        </div>
                   </div>
               </div>
        )
    }
}
