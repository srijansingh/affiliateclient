import React, { Component } from 'react'
import CategoryLists from './component/categoryLists';
import { Link } from "react-router-dom";
import "./category.css";
import { withStyles } from '@material-ui/core'
import ProductSlider from './component/productSlider';
import Loader from '../../component/Loader';

const styles = (theme) => ({
  root: {
      display:'flex '
  }});


class Category extends Component {
  constructor(){
    super()
    this.state = {
        isLoading :false,
        product : [],
        isCatLoading: false,
        category: [],
        errorMessage : false,
        errorCatMessage : false
    }
}

componentDidMount(){
    this.setState({

        isCatLoading:true
    });


    fetch('https://warm-scrubland-66696.herokuapp.com/user/category', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.status !==200){
            throw new Error('Failed to fetch the product')
        }
        return res.json()
    }).then(response => {
            console.log(response.category)
            this.setState({
                category : response.category,
                isCatLoading:false
        })
    })
    .catch(err => {
        this.setState({
            errorCatMessage:true,
            isCatLoading:false
        })
    })



    fetch('https://warm-scrubland-66696.herokuapp.com/user/active/product', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
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
            else if(!this.state.errorMessage){
                Listing = this.state.product.map((list, index) => {
                    return (
                        <Link to={"/cat/product/"+ list._id} key={index} style={{textDecoration:'none'}}>
                            <ProductSlider image={list.image} brand={list.brand.substring(0, 10)} title={list.title.substring(0,20)} rating={list.rating} price={list.price} />
                        </Link>
                    )
                })
            }


            let menu;
           
                if(this.state.isCatLoading){
                   menu = (
                      <div className="container">
                        <div className="row">
                          Loading...
                        </div>
                      </div>
                    )
                  }
                  else if(this.state.errorCatMessage){
                    menu  =(
                      <div className="container">
                        <div className="row">
                          {this.props.errMess}
                        </div>
                      </div>
                    )
                  } 
                  else if(this.state.category.length >0){
                      menu = this.state.category.map((category, index) => {
                         
                          return (
                            <Link style={{textDecoration:'none'}} to={"/category/"+ category}  key={index}>
                                <div>
                                    <CategoryLists category={category.toUpperCase()} />
                                </div> 
                            </Link>   
                          )
                      })
                  }
                    
            
       
        return (
            <div className="category">
                <div className="explore">
                  <div className="grid">
                    {menu}
                </div>

                {/* <span style={{padding:'0.5rem 1.5rem',fontSize:'1.5rem'}}>Shirts</span>
                  <div style={{marginTop:'20px', display:'flex',flexWrap:'wrap', padding:'0.5rem 0', justifyContent:'center'}}>
                   {Listing}
                </div> */}
                </div>
            </div>
        )
    }
}


export default withStyles(styles, {withTheme:true})(Category);