import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router ,Switch,Route } from 'react-router-dom';
import api from '../api/contacts'
import { v4 as uuid } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import UpdateContact from './UpdateContact';


function App() {
  const LOCAL_STORAGE_KEY="contacts"

  const [contacts,setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState("");

  //Retrieve Contacts
  const retrieveContacts = async ()=>{
    const response= await api.get("/contacts");
    return response.data;
  }

const removedContactHandler=async(id)=>{
  const newContactList= contacts.filter((contact)=>{
    return contact.id!==id;
  })
  await api.delete(`/contacts/${id}`)
  setContacts(newContactList);
}


const addContactHandler= async (contact)=>{
  const request={
    id:uuid(),
    ...contact
  }
  const reponse = await api.post('/contacts',request)
  setContacts([...contacts,reponse.data]);
}

const updateContactHandler = async (contact)=>{
  const response= await api.put(`/contacts/${contact.id}`,contact)
  const {id,name,email} = response.data;
  setContacts(contacts.map((contact)=>{
    return contact.id === id ? {...response.data} : {...contact};
  })
  );
};

const seachHandler=(searchTerm)=>{
   setSearchTerm(searchTerm);
   if(searchTerm!==""){
     const newFilteredList = contacts.filter((contact)=>{
       return Object.values(contact).join(" ").toLowerCase().
       includes(searchTerm.toLowerCase())
     });
     setSearchResults(newFilteredList);
   }else{
     setContacts(contacts)
   }

}

useEffect(()=>{
// const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
// if(retrieveContacts)setContacts(retrieveContacts);
    const getAllContacts = async() => { 
      const allcontacts = await retrieveContacts();
      console.log(allcontacts)
    if(allcontacts) setContacts(allcontacts)
    };
    getAllContacts();
},[])


useEffect(()=>{
  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
},[contacts])

  return (
    <div className='ui container'>
      {/* <Header/> */}
      <Router>
      <Header/>
      <Switch>
      <Route path='/' exact render={(props)=>(
        <ContactList {...props} contacts={searchTerm.length < 1 ? contacts:searchResults}
         getContactId={removedContactHandler} term={searchTerm}
         searchKey= {seachHandler}
         />
      )}/>
      <Route path='/add' render={(props)=>(
        <AddContact{...props} addContactHandler={addContactHandler}/>
      )}/>
      <Route path='/contact/:id' component={ContactDetails}/>
      <Route path='/update' render={(props)=>(
        <UpdateContact{...props} updateContactHandler={updateContactHandler}/>
      )}/>
      </Switch>
      </Router>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removedContactHandler}/>  */}
    </div>
  );
}

export default App;
