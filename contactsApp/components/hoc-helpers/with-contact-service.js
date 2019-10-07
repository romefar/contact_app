import React from 'react';
import { ContactConsumer } from '../contact-service-context';

const withContactService = (Wrapped) => {
    // return (props)  => {
    return (props) => {
        return (
            <ContactConsumer>
                {
                    (contactService) => {
                        return <Wrapped {...props} contactService={contactService} />
                    }
                }
            </ContactConsumer>
        )
    }
    //}
}

export default withContactService;