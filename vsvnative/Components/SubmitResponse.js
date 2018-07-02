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
import { endpointSubmit } from '../Endpoints';


export default class SubmitResponse extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {submitMessage: <View></View>};
    this.onPressSubmitButton = this.onPressSubmitButton.bind(this);
    this.quitScreen = this.quitScreen.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    this.getAnswers();
  }

  quitScreen() {
    this.props.quitScreen();
  }

  onPressSubmitButton() {
    fetch(endpointSubmit, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      },
      body: this.state.jsonString
    })
      .then(response => {
        if(response.status == 201) {
          let submitComponent = <Text>
                                  Successfully Submitted!
                                </Text>;
          this.setState({
            submitMessage: submitComponent
          });
          setTimeout( this.quitScreen, 1000);
        } else {
          let submitComponent = <Text>
                                  {"Error: " + response.status}
                                </Text>;
          this.setState({ submitMessage: submitComponent });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setDebug(a) {
    this.setState({debug: a});
  }

  getAnswers() {
    var string = "{\"uuid\":\"" + 'caf93575-2067-4b5d-a791-85fc9f56788b' + "\",\"content\":{";
    var lastID = "";
    for (i=0; i<this.props.userInput.length; i++) {
      if (this.props.userInput[i] !== undefined && this.props.userInput[i].json != "") {
        string = string + this.props.userInput[i].json + ",";
      }
    }
    string = string.slice(0, -1);
    string = string + "}}";
    this.setState({jsonString: string});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text>
            {this.state.jsonString}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit Questionnaire"
            color='#009A74'
            onPress={this.onPressSubmitButton}
          />
          {this.state.submitMessage}
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
