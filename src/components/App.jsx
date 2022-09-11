import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Container from './Container';
import Section from './Section';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    filter: '',
  };

  handleSubmitForm = newContact => {
    const {contacts} = this.state;
    if(contacts.find(({name})=> name.toLowerCase() === newContact.name.toLowerCase())){
      alert(`${newContact.name} is already in your contacts list`);
      return;
    }

    this.setState(({contacts}) => {
      return({
        contacts: [...contacts, newContact],
      })
    });
  };

  handleFilterInput = event => {
    const {value} = event.target;
    this.setState({
      filter: value,
    })

  };

  handleDeleteContact = (deleteId) => {
    this.setState(({contacts}) =>{
      return {contacts: contacts.filter(({id}) =>(deleteId !== id))}
    })
  }

  render() {
    const {filter, contacts} =this.state;
    const identicFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({name}) => (name.toLowerCase().includes(identicFilter)));

    return (
      <>
        <Section title="PhoneBook">
          <Container>
            <ContactForm onSubmit={this.handleSubmitForm} />
          </Container>
        </Section>
        <Section title="Contacts">
          <Container>
            <Filter
              filter={filter}
              onFilterHandle={this.handleFilterInput}
            />
            <ContactsList contacts={filter ? filteredContacts: contacts} filter={identicFilter} onDeleteContact={this.handleDeleteContact} />
          </Container>
        </Section>
      </>
    );
  }
}
