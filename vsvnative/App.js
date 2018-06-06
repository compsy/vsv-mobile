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
  Alert,
  StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import QuestionScreen from './QuestionScreen';
import AuthenticateUser from './Components/AuthenticateUser';


class HomeScreen extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.submitLoginInfo = this.submitLoginInfo.bind(this);
  }

  _onPressNothing() {
    Alert.alert('I told you this does nothing.')
  }

  componentWillMount() {
    this.setState({
                    loggedIn: false,
                    selectedURL: 'https://app.u-can-act.nl/api/v1/questionnaire/student_diary'
                  });
  }

  getHomeScreenComponent() {
    if (this.state.loggedIn) {
      //list
    } else {
      return(
        <AuthenticateUser
          submitLoginInfo={this.submitLoginInfo}
        />
      );
    }
  }

  submitLoginInfo(username, password) {

  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StatusBar
          barStyle={"dark-content"}
        />
      <View style={styles.background}>
        <View style={styles.menuContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {this.state.loggedIn ?
                "Select a questionnaire" : "Log in to access your\nquestionnaires"}
            </Text>
          </View>
          <View style={styles.componentContainer}>
            {this.getHomeScreenComponent()}
          </View>
        </View>
      </View>
      <View style={{flex: 0, justifyContent: 'center', backgroundColor: '#fff'}}>
        <Button
          onPress={() => this.props.navigation.navigate('Question', {responseURL: this.state.selectedURL})}
          title="Test question screen."
          color="#606060"
          fontSize="30"
        />
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
    Question: {
      screen: QuestionScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component<Props> {
  render() {
    return <NavStack/>
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  menuContainer: {
    width: '90%',
    height: '55%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  componentContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10
  },
});
