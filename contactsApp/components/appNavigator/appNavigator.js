import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer  } from 'react-navigation';
import MainContactView from '../mainContactView';
import ContactViewer from '../contactViewer';
import ContactCreator from '../contactCreator';
import ContactEditor from '../contactEditor';

const AppNavigator = createStackNavigator({
    Home: { screen: MainContactView,
         navigationOptions : {
            //To hide the NavigationBar
            header: null,
        }},
    AddContact : { screen : ContactCreator },
    ViewContact : { screen : ContactViewer},
    EditContact : { screen: ContactEditor }
});

export default createAppContainer(AppNavigator);