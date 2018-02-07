import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image, Button, TextInput, Keyboard, AsyncStorage } from 'react-native';
import { Images, Colors, Metrics } from '../Themes'
import AppConfig from '../Config/AppConfig'
import APIRequest from '../Config/APIRequest'

import NavigationButtons from '../Components/NavigationButtons'
import News from '../Components/News'
import Search from '../Components/Search'

export default class Main extends React.Component {

  state = {
    loading: true,
    articles : [],
    colors: [
      Colors.ember,
      Colors.ember,
      Colors.ember,
      Colors.ember,
      Colors.ember,
      Colors.ember
    ],
    searchText: "",
    category: ''
  }

  resetColors() {
    var newColors = [];
    for(var i = 0; i < this.state.colors.length; i++) {
      newColors.push(Colors.ember);
    }
    this.setState({colors: newColors, category: ''});
  }

  async componentDidMount() {
    this.loadArticles();
  }

  search = (queryString) => {
    Keyboard.dismiss();
    this.resetColors();
    this.loadArticles(queryString, '');
  }

  changeCategory = (index, category) => {
    var newColors = [];
    for(var i = 0; i < this.state.colors.length; i++) {
      if(i !== index) {
        newColors.push(Colors.steel);
      } else {
        newColors.push(Colors.ember);
      }
    }
    this.setState({colors: newColors, category: category, searchText: ""});
    this.loadArticles('', category);
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      // console.log(APIRequest);
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      var resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    this.setState({loading: false, articles: resultArticles})
  }

  resetList = async () => {
    this.setState({loading: true, articles: []});
    await this.loadArticles(this.state.searchText, this.state.category);
  }

  getArticleContent = () => {
    const {articles, loading} = this.state;

    let loadingState = null;

    if (loading) {
      loadingState = <ActivityIndicator
                              style={styles.activityIndicator}
                              size="large" color="black"/>;
    }

    return (
      <View style={{flex: 1}}>
        <News articles={articles} resetList={this.resetList}/>
        {loadingState}
      </View>
    )
  }

  searchChanged = (text) => {
    console.log(text);
    this.setState({searchText: text});
    this.resetColors();
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <View style={styles.container}>

        <NavigationButtons onChange={this.changeCategory} colors={this.state.colors}/>

        <Search
          inputPlaceholder='Search for News'
          searchAction={this.search}
          textValue={this.state.searchText}
          textChange={this.searchChanged}
        />

        {this.getArticleContent()}

        {//<Switcher />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Metrics.doubleBaseMargin,
  },
  logo: {
    height: '90%',
    resizeMode: 'contain',
  },
  activityIndicator: {
    flex: 1,
  },
});
