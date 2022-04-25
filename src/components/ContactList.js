import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import ContactCard from "./ContactCard";


const ContactList = (props) => {
    
        const inptEl = useRef("");

    const deleteContactHandler = (id) => {
        this.props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>
        );
    })

    const getSeachTerm = () => {
        props.searchKey(inptEl.current.value);
    }

    return (
        <div className="main">
            <h2>Contact List</h2>
            <Link to="/add"><button className="ui button blue right">Add Contact</button></Link>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref ={inptEl} type="text" placeholder="search contact" className="prompt"
                        value={props.term} onChange={getSeachTerm}></input>
                    <i className="search icon" />
                </div>
            </div>
            <div className="ui celled list">{renderContactList.length >0 ? renderContactList : "No results Found"}</div>
        </div>
    )
}

export default ContactList;