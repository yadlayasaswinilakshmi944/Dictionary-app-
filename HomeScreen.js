import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './database';


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
       text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }
  getWord = (text) => {
   var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Oh! Sorry this word is not available in our dictionary try other word');
      this.setState({
        text : '',
        isSearchPressed : false,
      });
    }
      
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'coral'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { 
              color: 'white', 
              fontSize: 20,
              fontFamily: 'Bevan',
              fontWeight: 'bold' 
              },
          }}
        />

        <Image
    style={styles.icon}
     source={
       require('diction.png')
     }
     />

       <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: 'Please wait...',
                lexicalCategory: '',
                examples: [],
                defination: '',
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.isSearchPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word: </Text>
                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type: </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition: </Text>
                <Text style={{ fontSize: 19 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'red',
    outline: 'none',
    backgroundColor: 'white',
    fontFamily: 'Amerika',
    fontSize: 30
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 3,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'teal',
    backgroundColor: 'magenta'
  },
  searchText: {
    textAlign: 'center',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color:'white'
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    fontFamily: 'times',
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
   width: 190,
    height:150,
    marginLeft: 70,
    borderWidth: 2
  }
});
