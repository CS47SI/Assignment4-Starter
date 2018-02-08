import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TextInput, Keyboard } from 'react-native';
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
    var newColors = this.state.colors.map(() => Colors.ember);

    //alternative to using the map() function:
    /*var newColors = [];
    for(var i = 0; i < this.state.colors.length; i++) {
      newColors.push(Colors.ember);
    }*/
    this.setState({colors: newColors, category: ''});
  }

  async componentDidMount() {
    await this.loadArticles();
  }

  search = (queryString) => {
    Keyboard.dismiss();
    this.resetColors();
    this.loadArticles(queryString, '');
  }

  changeCategory = (index, category) => {
    if(this.state.colors) {
      var newColors = this.state.colors.map((color, i) => { //loop through every item in the colors array
        if (i == index) { //and if it's our index
          return Colors.ember; //replace it for the color ember
        } else {
          return Colors.steel;
        }
      });

      //or we can filter our colors in one line:
      //var newColors = this.state.colors.map((colors,i) => i == index ? Colors.ember : Colors.steel)
    }
    this.setState({colors: newColors, category: category, searchText: ""});
    this.loadArticles('', category);
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
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
          textChange={this.searchChanged} />

        {this.getArticleContent()}

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
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
