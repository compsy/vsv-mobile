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
    this.state ={ fetched: false}
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
          fetched: true,
          data: responseJson.title,
        }, function(){

        });
      })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let data = this.state.fetched ? this.state.data : ' ';
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
              {data}
            </Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
