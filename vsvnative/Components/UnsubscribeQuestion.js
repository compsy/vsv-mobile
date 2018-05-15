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


export default class UnsubscribeQuestion extends Component<Props> {

  constructor(props){
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    var content = this.props.data.content;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <HTMLView
            value={"<body>" + content + "</body>"}
            stylesheet={unsubStyles}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={this.props.data.button_text}
            color='#009A74'
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
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const unsubStyles = StyleSheet.create({
  body: {
    fontSize: 28,
    textAlign: 'center',
  },
  strong: {
    fontWeight: 'bold',
    fontSize: 28,
  },
});
