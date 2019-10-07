import React, { Component } from 'react';
import AppNavigator from './components/appNavigator';
import { ContactProvider } from './components/contact-service-context';
import ContactService from './services/dummyData';

export default class App extends Component {

  contactService = new ContactService();



  render() {
    this.contactService.initializeContactList();
    return (
      <ContactProvider value={this.contactService}>
        <AppNavigator/>
      </ContactProvider>

    )
  }
}