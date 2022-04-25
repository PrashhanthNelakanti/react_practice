import React from "react";
import { Link } from "react-router-dom";
import user from '../images/user.jpg'

const ContactDetails = (props)=>{
    console.log(props)
    const {name,email}= props.location.state.contact;
    return(
        <div className="main">
            <div className="ui card center">
                <div className="image">
                    <img src={user} alt="user"/>
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <Link to="/">
            <div className="center-div">
                <button className="ui button red">Back to Contact List</button>
            </div>
            </Link>
        </div>
    )
}

export default ContactDetails;