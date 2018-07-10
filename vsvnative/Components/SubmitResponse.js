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
import { endpointSubmit, submitAuth } from '../Endpoints';


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
    if (!this.state.submitting) {
      this.setState({submitting: true});
      fetch(endpointSubmit, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': submitAuth
        },
        body: this.state.jsonString
      })
        .then(response => {
          if(response.status == 201) {
            let submitComponent = <Text>
                                    Successfully Submitted!
                                  </Text>;
            this.setState({ submitMessage: submitComponent});
            setTimeout( this.quitScreen, 1000);
          } else {
            let submitComponent = <Text style={{color: '#DC143C'}}>
                                    {"Error: " + response.status}
                                  </Text>;
            this.setState({ submitMessage: submitComponent });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.setState({submitting: false});
  }

  getAnswers() {
    var string = "{\"uuid\":\"" + this.props.responseID + "\",\"content\":{";
    var lastID = "";
    for (i=0; i<this.props.userInput.length; i++) {
      if (this.props.userInput[i] !== undefined && this.props.userInput[i].json != "") {
        let isHidden = false;
        for (j=0; j<this.props.hidden.length; j++) {
          if (this.props.userInput[i].id == this.props.hidden[j]) { isHidden = true }
        }
        if (!isHidden){
          string = string + this.props.userInput[i].json + ",";
        }
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
