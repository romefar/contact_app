import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './mainViewHeaderStyles';
import withContactService from '../hoc-helpers/';

 class mainViewHeader extends Component { 

    render() {
        const navigator = this.props.navigator;
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.header}>Contacts</Text>
                <View style={styles.plus}>
                    <TouchableOpacity
                        style={styles.container}
                        onPress={() => navigator.navigate('AddContact', { 
                            nav: this.props.navigator,
                            service : this.props.contactService,
                            update: this.props.updateData
                        })}>
                        <Image
                            source={require(`../../assets/plus-symbol.png`)}
                        />
                    </TouchableOpacity>
                </View>
            </View> 
        )
    } 
} 

export default withContactService(mainViewHeader);