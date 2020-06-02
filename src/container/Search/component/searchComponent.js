import React, { Component } from 'react'

export default class SearchComponent extends Component {
    render() {
        return (
            <div>
                <Link key={index} to={"/cat/product/"+ list._id} style={{textDecoration:'none'}}>
                    <Paper  elevation={2} className="flat-product">
                        <div className="flat-image">
                            <img src={list.image} alt={list.title}/>
                        </div>
                        <div className="flat-details">
                            
                            <span class="flat-title">{list.title.substring(0, 20)}</span>
                            <span className="flat-brand">{list.brand.substring(0, 10)}</span>
                            <span className="flat-rating">{list.rating}</span>
                        </div>
                        <div className="flat-best-box">
                            <div className="flat-best">
                                <span style={{fontWeight:'bold', fontSize:'1.5rem'}}> Best Price</span>
                                <span style={{fontWeight:'bold', fontSize:'1.5rem',color:'#d94711'}}>{list.price}</span>
                            </div>
                        </div>
                    </Paper>
                </Link>
            </div>
        )
    }
}
