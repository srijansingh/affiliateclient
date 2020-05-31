import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from "../../component/Loader";
import Paper from "@material-ui/core/Paper";

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

        fetch('http://localhost:8080/user/category/'+this.props.match.params.category, {
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
                            <Paper elevation={2} className="product-item">
                                <div className="image">
                                    <img src={list.image} alt={list.title}/>
                                </div>
                                <div class="details">
                                    <span className="brand">{list.brand.substring(0, 10)}</span>
                                    <span class="title">{list.title.substring(0, 20)}</span>
                                    <span className="rating">{list.rating}</span>
                                    <span className="price">{list.price}</span>
                                    <span className="soldby">Sold by Amazon</span>
                                </div>
                            </Paper>
                        </Link>
                    )
                })
            }
        
       
        return (
            <div style={{marginTop:'20px', display:'flex',flexWrap:'wrap', padding:'0.5rem 0', justifyContent:'center'}}>
               {Listing}
            </div>
        )
    }
}

export default CategoryProduct;