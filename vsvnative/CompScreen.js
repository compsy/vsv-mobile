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

export default class CompScreen extends React.Component<Props> {
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
              Component{'\n'}Test Menu:
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('Question')}
              title="Test Radio Component"
              color="#606060"
            />
            <Button
              onPress={this._onPressNothing}
              title="This button does nothing."
              color="#606060"
            />
            <Button
              onPress={this._onPressNothing}
              title="This button also does nothing."
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
