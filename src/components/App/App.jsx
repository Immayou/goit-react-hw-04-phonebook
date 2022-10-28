import { useState, useEffect } from "react";

import ContactForm from '../ContactForm/ContactForm'

import ContactList from '../ContactList/ContactList'

import Filter from '../Filter/Filter'

import { Wrapper, ContactsTitle } from './App.styled'

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
      <ContactForm submitData={formSubmitHandler}/>
      {isEmptyContacts && <ContactsTitle>Contacts</ContactsTitle>}
      {isEmptyContacts && <Filter value={filter} filterInput={filterHandler}/>}
      {isEmptyContacts && <ContactList contacts={contactsToRender} onDeleteContact={deleteContact}/>}
    </Wrapper>
  );
};

