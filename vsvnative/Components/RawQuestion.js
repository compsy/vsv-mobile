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
import HTMLView from 'react-native-htmlview';


export default class RawQuestion extends Component<Props> {

  constructor(props){
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    var rawContent = this.props.data.content;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <HTMLView
            value={rawContent}
            stylesheet={rawStyles}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const rawStyles = StyleSheet.create({
  p: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    },
});
