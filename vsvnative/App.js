/**
 * U-Can-Act Native App
 * https://github.com/compsy/svs-mobile
 * @flow
 */
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


class HomeScreen extends React.Component<Props> {
  _onPressPull() {
    this.props.navigation.navigate('Pull')
  }

  _onPressNothing() {
    Alert.alert('I told you this does nothing.')
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.menuContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.welcome}>
              Available{'\n'}Questionnaires:
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Pull')}
              title="Test a REST pull."
              color="#606060"
              fontSize="30"
            />
            <Button
              onPress={this._onPressNothing}
              title="This button does nothing."
              color="#606060"
              fontSize="30"
            />
            <Button
              onPress={this._onPressNothing}
              title="This button also does nothing."
              color="#606060"
              fontSize="30"
            />
          </View>
        </View>
      </View>
    );
  }
}

class PullScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ fetched: false, progress: 1}
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    return fetch('https://vsvproject-staging-pr-385.herokuapp.com/api/v1/questionnaire/dagboek_studenten')
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

const NavStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Pull: {
      screen: PullScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component<Props> {
  render() {
    return <NavStack />
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
