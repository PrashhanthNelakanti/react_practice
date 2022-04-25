import React from "react";
import { Link } from "react-router-dom";
import user from '../images/user.png'
const ContactCard = (props)=>{

    const {id,name,email} = props.contact;
    return(
        
        <div className="item">
            
            <img className="ui avatar image" src={user} alr="user" />
            <div className="content">
            <Link to={{pathname:`/contact/${id}`, state:{contact:props.contact}}}>
                <div className="header">{name}</div>
                <div>{email}</div>
            </Link>
            </div>
            <Link to={{pathname:`/update`,state:{contact:props.contact}}}>
            <i className="edit alternate outline icon"
            style={{color:"blue",marginTop:"7px",marginLeft:"10px"}}
            ></i>
            </Link>
            <i className="trash alternate outline icon"
            style={{color:"red",marginTop:"7px"}}
            onClick={()=>props.clickHandler(id)}></i>  
        </div>
    )
}

export default ContactCard;