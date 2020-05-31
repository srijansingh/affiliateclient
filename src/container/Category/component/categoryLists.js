import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import LabelIcon from '@material-ui/icons/Label';


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});

class CategoryLists extends Component {
    render() {
        return (
            
                <Paper elevation={3} style={{width:'250px',margin:'20px',background:'white', height:"100px", display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                   
                    <div style={{background:'blue', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', width:'80px'}} >
                         <LabelIcon style={{color:'white', fontSize:'3rem'}}/>
                   </div>
                   <div style={{width:'100%'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                                <div style={{fontSize:'1rem',fontWeight:'bold', color:'blue'}}>{this.props.category}</div>
                                
                        </div>
                   </div>

                </Paper>
       
        )
    }
}


export default withStyles(styles, {withTheme:true})(CategoryLists)