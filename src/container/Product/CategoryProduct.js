import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from "../../component/Loader";
import Paper from "@material-ui/core/Paper";
import "./CategoryProduct.css"
class CategoryProduct extends Component {
    constructor(){
        super()
        this.state = {
            isLoading :false,
            product : [],
            errorMessage : false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })

        fetch('https://warm-scrubland-66696.herokuapp.com/user/category/'+this.props.match.params.category, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
                console.log(response)
                this.setState({
                    product : response.post,
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

        let Listing;
            if(this.state.isLoading){
                Listing = (
                    <Loader />
                )
            }

            else if(this.state.errorMessage){
                Listing = (
                    <div>Something is not fine</div>  
                )
            }

            else if(this.state.product.length <1){
                Listing = (
                    <div>Not found</div>  
                )
            }

            else {
                Listing = this.state.product.map((list, index) => {
                    return (
                        <Link key={index} to={"/cat/product/"+ list._id} style={{textDecoration:'none'}}>
                            <Paper elevation={2} className="flat-product">
                                <div className="flat-image">
                                    <img src={list.image} alt={list.title}/>
                                </div>
                                <div class="flat-details">
                                   
                                    <span class="flat-title">{list.title.substring(0, 20)}</span>
                                    <span className="flat-brand">{list.brand.substring(0, 10)}</span>
                                    <span className="flat-rating">{list.rating}</span>
                                    <span className="flat-price">{list.price}</span>
                                  
                                </div>
                            </Paper>
                        </Link>
                    )
                })
            }
        
       
        return (
            <div className="flat-box">
                <div className="flat-container">
                    {Listing}
                </div>
            </div>
        )
    }
}

export default CategoryProduct;