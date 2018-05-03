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

export default class PullScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ fetched: false, progress: 1}
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    return fetch('https://vsvproject-staging.herokuapp.com/api/v1/questionnaire/student_diary')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
          fetched: true,
          questionnaireContent: responseJson.content,
        }, function(){

        });
      })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let qTitle = this.state.fetched ?
      this.state.questionnaireContent[this.state.progress].title : 'Loading...';
    return (
      <View style={styles.background}>
        <View style={styles.menuContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.welcome}>
              REST Pull Test
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.menuItem}>
              {qTitle}
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
