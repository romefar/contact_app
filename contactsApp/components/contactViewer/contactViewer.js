import React, { Component, Fragment } from 'react';
import { Text, SafeAreaView, Clipboard, View, Alert, Button } from 'react-native';
import withContactService from '../hoc-helpers';
import objToArray from '../../utils';
import styles from './contacViewerStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const uuidv1 = require('uuid/v1');

class ContactViewer extends Component { 

    state = { 
        id : null,
        data: null
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    style={styles.doneButton}
                    onPress={navigation.getParam('onEditPress')}
                    title="Edit"
                />
            )
        }
    }            

    onEditPress = () => {
        this.props.navigation.navigate('EditContact', {
            itemId: this.props.navigation.getParam("itemId"),
            service: this.props.navigation.getParam('service'),
            update : this.props.navigation.getParam('update'),
        })
    }

    onLongPressHandler = (item) => { 
        alert(item);
        writeToClipboard();
    }

    writeToClipboard = async (item) => {   
        await Clipboard.setString(item);
        Alert.alert('', 'Copied!', []);
      };

    fetchData = (id) => { 
        return this.props.navigation.getParam('service').getContactById(id);
    }
    componentDidMount = () => { 
        this.props.navigation.setParams({onEditPress : this.onEditPress});
    }

    componentWillMount = () => { 
        const id = this.props.navigation.getParam("itemId", "ID WAS NOT FOUND");
        const data = objToArray((this.fetchData(id)));
        data.shift();
        this.setState({
            id,
            data
        });
    }

    renderItems = () => { 
        let contactData = this.state.data;
        return (
            <SafeAreaView style={styles.safeAreaStyle}>
                <Text style={styles.header}>Contact info</Text>
                {contactData.map((item) => {
                    return (
                        <View key={uuidv1()} style={styles.dataContainer}>
                            <Text key={uuidv1()} style={styles.label}>{item[0]}:</Text>
                            <TouchableOpacity onLongPress={() => this.writeToClipboard(item[1])}>
                                <Text key={uuidv1()} style={styles.output}>{item[1]}</Text>
                            </TouchableOpacity>
                        </View> 
                    );
                })}
            </SafeAreaView>
        );
    }

    render() { 
        return (
            <Fragment>
                {this.renderItems()}
            </Fragment>
        )
    }

}

export default ContactViewer;