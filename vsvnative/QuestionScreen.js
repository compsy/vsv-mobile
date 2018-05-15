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
import CheckQuestion from './Components/CheckQuestion';
import RadioQuestion from './Components/RadioQuestion';
import RangeQuestion from './Components/RangeQuestion';
import RawQuestion from './Components/RawQuestion';


export default class QuestionScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ fetched: "false", progress: 0}
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressNext = this.onPressNext.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    return fetch(
      'https://app.u-can-act.nl/api/v1/questionnaire/student_diary'
    )
    .then((response) => {
      if(response.status == 200) {
        return response.json();
      } else {
        this.setState({
          fetched: "failed",
          error: response.status,
        })
      }
    })
    .then((responseJson) => {
      if (!(this.state.fetched === "failed")) {
        this.setState({
          fetched: "true",
          qContent: responseJson.content,
          qLength: responseJson.content.length,
        })
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getQuestionComponent() {

    switch(this.state.qContent[this.state.progress].type) {

      case "checkbox":
        return(
          <CheckQuestion
            data={this.state.qContent[this.state.progress]}
          />
        );
        break

      case "radio":
        return(
          <RadioQuestion
            data={this.state.qContent[this.state.progress]}
          />
        );
        break

      case "range":
        return(
          <RangeQuestion
            data={this.state.qContent[this.state.progress]}
          />
        );
        break

      case "raw":
        return(
          <RawQuestion
            data={this.state.qContent[this.state.progress]}
          />
        );
        break

      default:
        return(
          <Text style={styles.title}>
            {this.state.qContent[this.state.progress].type}
          </Text>
        );
    }
  }

  getQuestionContent() {
    switch(this.state.fetched) {
      case "true":
        return this.getQuestionComponent();
        break;

      case "false":
        return(
          <Text style={styles.menuItem}>
            Loading...
          </Text>
        );
        break;

      case "failed":
        return(
          <Text style={styles.menuItem}>
            Failed to fetch from API.{"\n"}Error Code: {this.state.error}
          </Text>
        );
        break;
    }
  }

  /**
  * On Press Handlers
  */

  onPressNext() {
    if(this.state.progress + 1 < this.state.qLength) {
      this.setState({ progress: this.state.progress + 1 });
    }
  }

  onPressBack() {
    if(this.state.progress > 0) {
      this.setState({ progress: this.state.progress - 1 });
    }
  }


  render() {

    if (this.state.fetched === "true") {
      progressText = (this.state.progress + 1) +  " of " + this.state.qLength;
    } else {
      progressText = "";
    }
    var qContentComponent = this.getQuestionContent();
    return (
      <View style={styles.background}>
        <View height={25}></View>
        <View style={styles.qContentContainer}>
          {qContentComponent}
        </View>
        <View style={styles.navContainer}>
          <Button
            onPress={this.onPressBack}
            title="Back"
            color="#606060"
          />
          <Text style={styles.progressIndicator}>
            {progressText}
          </Text>
          <Button
            onPress={this.onPressNext}
            title="Next"
            color="#606060"
          />
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
  qContentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  progressIndicator: {
    fontSize: 12,
    color: '#606060',

  },
  title: {
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
