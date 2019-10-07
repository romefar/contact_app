import React, { Component } from 'react'
import { TextInput, Button, ScrollView, SafeAreaView, Alert, Text, View } from 'react-native';
import styles from './contactCreatorStyles';
import { parsePhoneNumberFromString as parseMax } from 'libphonenumber-js/max'
import withContactService from '../hoc-helpers/';
import { withNavigation } from 'react-navigation';
const uuidv1 = require('uuid/v1');

class ContactCreator extends Component {

    formData = {
        name: '',
        surname: '',
        middleName: '',
        phone: '',
        email: '',
    }

    state = { 
        error: false
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
            textContentType: 'familyName',
       
        },
        {
            label: 'Middle name',
            placeholder: 'Middle name',
            textContentType: 'middleName',
        },
        {
            label: 'Phone',
            placeholder: 'Phone',
            textContentType: 'telephoneNumber',
            keyboardType: 'phone-pad',
        },
        {
            label: 'Email',
            placeholder: 'Email',
            textContentType: 'emailAddress',
            keyboardType: 'email-address',
        }

    ];

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    style={styles.doneButton}
                    onPress={navigation.getParam('onLogin')}
                    title="Done"
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

    onLoginHandler = () => {
        console.log(this.formData);
        let { ...params } = this.formData;
        if (!Object.values(params).every((item) => !!item)) {
            Alert.alert('Warning', "Wrong input. Try again");
        } else {
            this.props.navigation.getParam('service').addItem({
                key: uuidv1(),
                ...this.formData
            });
            alert('Data added');
            this.props.navigation.getParam('update')();
            this.props.navigation.goBack();
            
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ onLogin: this.onLoginHandler });
        console.log(this.props.contactService);
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
        if (this.validateTextField(text)) {
            this.formData.name = text;
            // this.setState({
            //     error: false
            // })
        }
        else {
            this.formData.name = null;
            // this.setState({
            //     error: true
            // });
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
        return data.map(({ label, placeholder, keyboardType, textContentType }, i) => {
            let inStyles = [styles.input];
            // if(this.formData[label.split(' ').join('').toLowerCase()] === null) {
            //     inStyles.push(styles.error);
            //     console.log('ERROR IN NAME TEXTINPUT');
            // }

            return (
                <View key={uuidv1()} style={styles.viewBorder}>
                    <Text style={styles.label}>{label}:</Text>
                    <TextInput
                        style={inStyles}
                        placeholder={placeholder}
                        onBlur={this.formHandlers[i]}
                        textContentType={textContentType}
                        keyboardType={!keyboardType ? "default" : keyboardType}
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
                    {/* <View key={uuidv1()} style={styles.viewBorder}>
                        <Text style={styles.label}>{`Name`}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`Name`}
                            onBlur={this.onNameTextHandler}
                            textContentType={'name'}
                        />
                    </View>

                    <View key={uuidv1()} style={styles.viewBorder}>
                        <Text style={styles.label}>{`Surname`}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Surname'}
                            onBlur={this.onSurnameTextHandler}
                            textContentType={'familyName'}
                        />
                    </View>
                    <View key={uuidv1()} style={styles.viewBorder}>
                        <Text style={styles.label}>{'Middle name'}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Middle name'}
                            onBlur={this.onMiddleNameTextHandler}
                            textContentType={'middleName'}
                        />
                    </View>
                    <View key={uuidv1()} style={styles.viewBorder}>
                        <Text style={styles.label}>{'Phone'}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Phone'}
                            onBlur={this.onPhoneTextHandler}
                            textContentType={'telephoneNumber'}
                            keyboardType={'phone-pad'}
                        />
                    </View>
                    <View key={uuidv1()} style={styles.viewBorder}>
                        <Text style={styles.label}>{'Email'}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Email'}
                            onBlur={this.onEmailTextHandler}
                            textContentType={'emailAddress'}
                            keyboardType={'email-address'}
                        />
                    </View> */}
                    {this.renderFormItems(this.fromInputs)}
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default ContactCreator;