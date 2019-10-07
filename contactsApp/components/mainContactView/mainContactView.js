import React, { Component } from 'react';
import { SectionList, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import withContactService from '../hoc-helpers';
import MainViewHeader from '../mainViewHeader';
import SearchBar from '../searchBar';
import styles from './mainContactViewStyles';

class MainContactView extends Component {

  state = {
    headers: null,
    term: ''
  }

  onPressHandler = (id) => {
    this.props.navigation.navigate('ViewContact', {
      itemId: id,
      service: this.props.contactService,
      update: this.update
    });
  }
  componentWillMount = () => {
    this.setState({
      headers: this.props.contactService.getSectionHeaders()
    });
  }

  update = () => {
    this.setState({
      term : '',
      headers: this.props.contactService.getSectionHeaders()
    });
    console.log('UPDATED');
  }

  onSearchHandler = (text) => {

    const items = this.state.headers;
    if (text.trim() === '') {
      this.setState({ term: '' });
    }


    let data = items.map(item => {
      let data = item.data.filter(item => {
        return item.surname.toLowerCase().includes(text.toLowerCase());
      });
      return data.length !== 0 ? { data, title: item.title} : false;
    });
    data = data.filter(item => !!item);
    this.setState({ term: data });
  }

  componentWillUnmount = () => {
    console.log("COMPOMENT WAS UNMOUNTED");
  }
 
  render() {
    let sectionHeaders = this.state.term ? this.state.term : this.state.headers;
    console.log(this.state.term);
    return (
      <SafeAreaView style={styles.container}>
        <MainViewHeader updateData={this.update} navigator={this.props.navigation} />
        <SearchBar clearInput={this.clearInput} searchHandler={this.onSearchHandler} />
        <SectionList
          sections={sectionHeaders}
          renderItem={
            ({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.onPressHandler(item.key)} activeOpacity={0.2}>
                  <Text style={[styles.item]}>{`${item.name} ${item.middleName}`} <Text style={styles.surnameHighlited}>{item.surname}</Text></Text>
                </TouchableOpacity >
              )
            }}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={({ key }) => key}
        />
      </SafeAreaView>
    );
  }
}


export default withContactService(MainContactView);
