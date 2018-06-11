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


export default class SubmitResponse extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {unsubMessage: <View></View>};
    this.onPressUnsubButton = this.onPressUnsubButton.bind(this);
    this.quitScreen = this.quitScreen.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  quitScreen() {
    this.props.quitScreen();
  }

  onPressUnsubButton() {
    const unsubComponent = <Text>
                              Successfully Unsubscribed!
                           </Text>;
    this.setState({ unsubMessage: unsubComponent });
    //setTimeout( this.quitScreen, 1000);
  }

  setDebug(a) {
    this.setState({debug: a});
  }

  getAnswers() {
    var string = "{\"response_id\":\"" + this.props.responseID + "\",\"content\":{";
    for (i=0; i<this.props.userInput.length; i++) {
      if (this.props.userInput[i] !== undefined) {
        string = string + this.props.userInput[i].json + ",";
      }
    }
    string = string.slice(0, -1);
    string = string + "}}";
    return string;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text>
            {this.getAnswers()}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit Questionnaire"
            color='#009A74'
            onPress={this.onPressUnsubButton}
          />
          {this.state.unsubMessage}
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
