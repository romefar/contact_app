import React, { Component } from 'react'
import { TextInput, Button, ScrollView, SafeAreaView, Alert, Text, View } from 'react-native';
import styles from './contactEditorStyles';
import { parsePhoneNumberFromString as parseMax } from 'libphonenumber-js/max'

const uuidv1 = require('uuid/v1');

class ContactEditor extends Component {

    formData = {
        key: '',
        name: '',
        surname: '',
        middleName: '',
        phone: '',
        email: '',
    }

    // form inputs 
    fromInputs = [
        {
            label: 'Name',
            placeholder: 'Name',
            textContentType: 'name',
        },
        {
            label: 'Surname',
            placeholder: 'Surname',
            textContentType: 'familyName'
       
        },
        {
            label: 'Middle name',
            placeholder: 'Middle name',
            textContentType: 'middleName'
        },
        {
            label: 'Phone',
            placeholder: 'Phone',
            textContentType: 'telephoneNumber',
            keyboardType: 'phone-pad'
        },
        {
            label: 'Email',
            placeholder: 'Email',
            textContentType: 'emailAddress',
            keyboardType: 'email-address'
        }

    ];

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    style={styles.doneButton}
                    onPress={navigation.getParam('onSave')}
                    title="Save"
                />
            )
        }
    }

    validateTextField = (text) => {
        return /^[a-zA-Z ]+$/.test(text)
    }

    emailIsValid = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    onSaveHandler = () => {
        let { ...params } = this.formData;
        console.log(this.formData);
        if (!Object.values(params).every((item) => !!item)) {
            Alert.alert('Warning', "Wrong input. Try again");
        } else {
            this.props.navigation.getParam('service').updateContact(this.formData);
            alert('Data saved');
            this.props.navigation.getParam('update')();
            this.props.navigation.navigate('Home');
        }
    }

    fetchData = (id) => { 
        return this.props.navigation.getParam('service').getContactById(id);
    }

    componentWillMount() {
        this.props.navigation.setParams({ onSave: this.onSaveHandler });
        const id = this.props.navigation.getParam('itemId');
        const data = this.props.navigation.getParam('service').getContactById(id);
        this.formData = {
            ...data
        }
    }
 

    onSurnameTextHandler = (e) => {
        let text = e.nativeEvent.text;
        if (this.validateTextField(text))
            this.formData.surname = text;
        else
            this.formData.surname = null;
    }
          


    onNameTextHandler = (e) => {
        let text = e.nativeEvent.text;
        if (this.validateTextField(text)){
            this.formData.name = text;
        }
        else
           {
            this.formData.name = null;
           }
    }

    onMiddleNameTextHandler = (e) => {
        let text = e.nativeEvent.text;
        if (this.validateTextField(text))
            this.formData.middleName = text;
        else
            this.formData.middleName = null;
    }

    onPhoneTextHandler = (e) => {
        if (e.nativeEvent.text === "") return;
        let phoneReg = parseMax(e.nativeEvent.text, 'BY');
        if (phoneReg.isValid()) {
            this.formData.phone = e.nativeEvent.text;
        } else {
            this.formData.phone = null;
        }
    }

    onEmailTextHandler = (e) => {
        if (this.emailIsValid(e.nativeEvent.text)) {
            this.formData.email = e.nativeEvent.text;
        } else {
            this.formData.email = null;
        }
    }

    renderFormItems = (data) => {
        console.log("<<<<<<<<<<<<<<<<<-----re-render--->>>>>>>>>>>>>");
        return data.map(({ label, placeholder, keyboardType, textContentType}, i) => {
            let inStyles = [styles.input];
            let mdNameHolder = label === 'Middle name' ? textContentType : label.toLowerCase();
            // if(this.formData[label.split(' ').join('').toLowerCase()] === null && this.state.error) {
            //     inStyles.push(styles.error);
            // }
            return (
                <View key={uuidv1()} style={styles.viewBorder}>
                    <Text style={styles.label}>{label}:</Text>
                    <TextInput
                        style={inStyles}
                        placeholder={placeholder}
                        onChange={this.formHandlers[i]}
                        textContentType={textContentType}
                        keyboardType={!keyboardType ? "default" : keyboardType}
                        defaultValue={this.formData[mdNameHolder]}
                    />
                </View>
            )
        });
    }

    formHandlers = [
        this.onNameTextHandler,
        this.onSurnameTextHandler,
        this.onMiddleNameTextHandler,
        this.onPhoneTextHandler,
        this.onEmailTextHandler
    ];
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.innerContainer}>
                    {this.renderFormItems(this.fromInputs)}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default ContactEditor;