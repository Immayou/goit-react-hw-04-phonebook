import { useState, useEffect } from "react";

// import React, {Component} from 'react'

import ContactForm from '../ContactForm/ContactForm'

import ContactList from '../ContactList/ContactList'

import Filter from '../Filter/Filter'

import { Wrapper, Title, ContactsTitle } from './App.styled'

export const App = () => {

  const [contacts, setContacts] = useState(() => {return JSON.parse(window.localStorage.getItem('addedContacts')) ?? []})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    window.localStorage.setItem('addedContacts', JSON.stringify(contacts))
    if (contacts.length === 0) {
    window.localStorage.removeItem('addedContacts')
    }
  }, [contacts])

  const formSubmitHandler = data => {
    const checkIfNewContactAlreadyExists = contacts.find(({name}) => (name.toLowerCase() === data.name.toLowerCase()))
    checkIfNewContactAlreadyExists ?
    alert(`${data.name} is already in contacts`)
    : setContacts(prevState => ([data, ...prevState]))
  }

  const filterHandler = e => {
    setFilter(e.currentTarget.value)
  }

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(({name}) => name.toLowerCase().includes(normalizeFilter))
    return visibleContacts
  }

  const deleteContact = (idToDelete) => {
    setContacts(prevState => (prevState.filter(({id}) => id !== idToDelete)))
  }
  
  const contactsToRender = getFiltredContacts();
  const isEmptyContacts = contacts.length !== 0;

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm submitData={formSubmitHandler}/>
      {isEmptyContacts && <ContactsTitle>Contacts</ContactsTitle>}
      {isEmptyContacts && <Filter value={filter} filterInput={filterHandler}/>}
      {isEmptyContacts && <ContactList contacts={contactsToRender} onDeleteContact={deleteContact}/>}
    </Wrapper>
  );
};

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: ''
//   }

//   componentDidMount () {
//     const addedContacts = localStorage.getItem('addedContacts')
//     const parsedAddedContacts = JSON.parse(addedContacts)
//     if (parsedAddedContacts) {
//       this.setState( {contacts: parsedAddedContacts}) }
//   }

//   componentDidUpdate (prevProps, prevState) {
//     const {contacts} = this.state
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('addedContacts', JSON.stringify(contacts))
//     } 
//     if (contacts.length === 0) {
//       localStorage.removeItem('addedContacts')
//     }
//   }

//   formSubmitHandler = data => {
//     console.log(data)
//     const checkIfNewContactAlreadyExists = this.state.contacts.find(({name}) => (name.toLowerCase() === data.name.toLowerCase()))
//     checkIfNewContactAlreadyExists ?
//     alert(`${data.name} is already in contacts`)
//     : this.setState((prevState) => ({contacts: [data, ...prevState.contacts]}))
//   }

//   filterHandler = (e) => {
//     this.setState({filter: e.currentTarget.value})
//   }

//   getFiltredContacts = () => {
//     const { filter, contacts } = this.state
//     const normalizeFilter = filter.toLowerCase();
//     const visibleContacts = contacts.filter(({name}) => name.toLowerCase().includes(normalizeFilter))
//     return visibleContacts
//   }

//   deleteContact = (idToDelete) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(({id}) => id !== idToDelete)
//     }))
//   }

//   render () {
//     const { filter, contacts} = this.state
//     const contactsToRender = this.getFiltredContacts();
//     const isEmptyContacts = contacts.length !== 0;

//   return (
//     <Wrapper>
//       <Title>Phonebook</Title>
//       <ContactForm submitData={this.formSubmitHandler}/>
//       {isEmptyContacts && <ContactsTitle>Contacts</ContactsTitle>}
//       {isEmptyContacts && <Filter value={filter} filterInput={this.filterHandler}/>}
//       {isEmptyContacts && <ContactList contacts={contactsToRender} onDeleteContact={this.deleteContact}/>}
//     </Wrapper>
//   );
//     };
// };

// export default App;