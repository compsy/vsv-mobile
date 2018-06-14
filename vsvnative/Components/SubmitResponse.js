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

  componentDidMount(){
    this.getAnswers();
  }

  quitScreen() {
    this.props.quitScreen();
  }

  onPressUnsubButton() {
    fetch('https://2041dbe5397077cfba735a0c:dea44ad2b0bd2fabb5eb749052e85e01@vsvproject-staging-pr-457.herokuapp.com/api/v1/response', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.state.jsonString
    })
      .then(response => {
        if(response.status == 200) {
          this.setState({
            jsonString: "received: " + JSON.stringify(response.json()),
            unsubMessage: unsubComponent
          });
        } else {
          this.setState({
            jsonString: response.status,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
      const unsubComponent = <Text>
                                Successfully Submitted!
                             </Text>;

    //setTimeout( this.quitScreen, 1000);
  }

  setDebug(a) {
    this.setState({debug: a});
  }

  getAnswers() {
    var string = "{\"uuid\":\"" + 'caf93575-2067-4b5d-a791-85fc9f56788b' + "\",\"content\":{"; //this.props.responseID
    var lastID = ""
    for (i=0; i<this.props.userInput.length; i++) {
      if (this.props.userInput[i] !== undefined && this.props.userInput[i].json != "") {
        string = string + i + this.props.userInput[i].json + ",";
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
