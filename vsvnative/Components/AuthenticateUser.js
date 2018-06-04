import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';



export default class AuthenticateUser extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {invalid: false}
  }

  invalidText() {
    if (this.state.invalid) {
      return (
        <Text style={{color: '#DC143C'}}>
          Invalid Username or Password
        </Text>
      );
    } else {
      return (<View></View>);
    }
  }

  submitLoginInfo() {
    if (this.state.username != undefined && this.state.password != undefined
       && this.state.username.length > 0 && this.state.password.length > 0) {
      this.props.submitLoginInfo(this.state.username, this.state.password);
      this.setState({invalid: false});
    } else {
      this.setState({invalid: true});
    }
  }

  render() {

    return (
      <View style={styles.mainContainer}>
        <View style={styles.itemContainer}>
          <TextInput
            style={styles.loginInput}
            onChangeText={(user) => this.setState({username: user})}
            placeholder={'Username'}
          />
        </View>

        <View style={styles.itemContainer}>
          <TextInput
            style={styles.loginInput}
            onChangeText={(pass) => this.setState({password: pass})}
            secureTextEntry={true}
            placeholder={'Password'}
          />
        </View>

        <View style={styles.itemContainer}>
          <Button
            onPress={() => this.submitLoginInfo()}
            title="Log In"
            color="#606060"
            fontSize="30"
          />
          {this.invalidText()}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: 20,
  },
  loginLabel: {
    fontSize: 26,
  },
  itemContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginInput: {
    width: '100%',
    backgroundColor: '#ddd',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 26,
    height: 50
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  slider: {
    width: '95%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
});
