import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class QuestionScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ fetched: "false", progress: 1}
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    return fetch('https://vsvproject-staging-pr-385.herokuapp.com/api/v1/questionnaire/dagboek_studenten')
    .then((response) => {
      if(response.status == 200) {
        return response.json();
      } else {
        this.setState({
          fetched: "failed",
          error: response.status,
        })
      }
    })
    .then((responseJson) => {
      if (!(this.state.fetched === "failed")) {
        this.setState({
          fetched: "true",
          questionnaireContent: responseJson.content,
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  contentText() {
    switch(this.state.fetched) {
      case "true":
        return this.state.questionnaireContent[this.state.progress].title;
        break;

      case "false":
        return "Loading...";
        break;

      case "failed":
        return "Failed to fetch from API.\nError Code: " + this.state.error;
        break;
    }
  }

  render() {

    return (
      <View style={styles.background}>
        <View style={styles.menuContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.welcome}>
              Question:
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.menuItem}>
              {this.contentText()}
            </Text>
          </View>
          <View style={styles.navContainer}>
            <Button
              onPress={() => this.setState({ progress: this.state.progress - 1 }) }
              title="Back"
              color="#606060"
            />
            <Button
              onPress={() => this.setState({ progress: this.state.progress + 1 }) }
              title="Next"
              color="#606060"
            />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  menuContainer: {
    width: '90%',
    height: '80%',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemContainer: {
    width: '100%',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
  menuItem: {
    width: '90%',
    fontSize: 18,
    color: '#606060',
    textAlign: 'center',
    marginBottom: 5,
  },
});
