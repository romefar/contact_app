import React, { Component } from 'react'
import { TextInput, View } from 'react-native';
import styles from './searchBarStyles';

class SearchBar extends Component { 

    render() { 
        const searchHandler = this.props.searchHandler;
        return (
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder={'Type search here...'}
                   onChangeText={searchHandler}
                />
            </View>
        )
    }
}


export default SearchBar;