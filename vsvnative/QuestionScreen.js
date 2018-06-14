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
import { Icon } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import CheckQuestion from './Components/CheckQuestion';
import RadioQuestion from './Components/RadioQuestion';
import RangeQuestion from './Components/RangeQuestion';
import RawQuestion from './Components/RawQuestion';
import UnsubscribeQuestion from './Components/UnsubscribeQuestion';
import SubmitResponse from './Components/SubmitResponse';

export default class QuestionScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ fetched: "false", progress: 0 }
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressNext = this.onPressNext.bind(this);
    this.quitScreen = this.quitScreen.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.keepUserInput = this.keepUserInput.bind(this);
    this.showAndHideQuestions = this.showAndHideQuestions.bind(this);
    this.hasRequiredInput = this.hasRequiredInput.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    return fetch(
      this.props.navigation.state.params.selectedURL
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
        this.populateQuestionArrays(responseJson.questionnaire_content);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  populateQuestionArrays(questions) {
    var hide = new Array();
    for (i=0; i<questions.length; i++) {
      if (questions[i].hidden !== undefined && questions[i].hidden == true) {
        hide.push(questions[i].id);
      }
    }
    this.setState({
                    qContent: questions,
                    hidden: hide,
                    fetched: "true",
                    userInput: [],
                    numSkipped: 0,
                    requiresInput: false,
                    inSubmitScreen: false
                  });
  }

  componentDidUpdate(){
    if (this.state.submitReady && !this.state.requiresInput && !this.state.inSubmitScreen) {
      this.setState({inSubmitScreen: true});
    }
  }

  getQuestionComponent() {
    if (this.state.submitReady && !this.state.requiresInput) {
      return(
        <SubmitResponse
          userInput={this.state.userInput}
          quitScreen={this.quitScreen}
          data={this.state.qContent}
          hidden={this.state.hidden}
          responseID={this.props.navigation.state.params.responseID}
        />
      );
    } else {
      var userInput = undefined;
      for (i=0; i<this.state.userInput.length; i++) {
        if (this.state.userInput[i] !== undefined && this.state.userInput[i].id == this.state.qContent[this.state.progress].id) {
           userInput = this.state.userInput[i].input;
         }
      }
      //var userInput = (this.state.userInput[this.state.progress] !== undefined ? this.state.userInput[this.state.progress].input : undefined);
      switch(this.state.qContent[this.state.progress].type) {

        case "checkbox":
          return(
            <CheckQuestion
              data={this.state.qContent[this.state.progress]}
              openPopup={this.openPopup}
              index={this.state.progress}
              checked={userInput}
              updateUserInput={this.keepUserInput}
              requiresInput={this.hasRequiredInput}
            />
          );
          break;

        case "radio":
          return(
            <RadioQuestion
              data={this.state.qContent[this.state.progress]}
              openPopup={this.openPopup}
              index={this.state.progress}
              checked={userInput}
              updateUserInput={this.keepUserInput}
              requiresInput={this.hasRequiredInput}
            />
          );
          break;

        case "range":
          return(
            <RangeQuestion
              data={this.state.qContent[this.state.progress]}
              openPopup={this.openPopup}
              index={this.state.progress}
              value={userInput}
              updateUserInput={this.keepUserInput}
            />
          );
          break;

        case "raw":
          return(
            <RawQuestion
              data={this.state.qContent[this.state.progress]}
            />
          );
          break;

        case "unsubscribe":
          return(
            <UnsubscribeQuestion
              data={this.state.qContent[this.state.progress]}
              quitScreen={this.quitScreen}
            />
          );
          break;

        default:
          return(
            <Text style={styles.title}>
              {
                this.state.qContent[this.state.progress].type +
                " is not a recognised question type."
              }
            </Text>
          );
      }
    }
  }

  hasRequiredInput(){
    this.setState({requiresInput: true})
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

  isHidden(question) {
    for (i=0; i<this.state.hidden.length; i++) {
      if (question !== undefined && this.state.hidden[i] === question.id) {
        return true;
      }
    }
    return false;
  }

  /**
  * On Press Handlers
  */
  onPressNext() {
    this.showAndHideQuestions();
    var newProgress = this.state.progress;
    var numSkipped = this.state.numSkipped;
    var ready = false;
    if(!this.state.requiresInput) {
      if ((newProgress + 1 - numSkipped) < (this.state.qContent.length - this.state.hidden.length)) {
        newProgress++;
        while ((newProgress - numSkipped) < (this.state.qContent.length - this.state.hidden.length) && this.isHidden(this.state.qContent[newProgress])) {
          newProgress++;
          numSkipped++;
        }
      } else {
        ready = true;
      }
      this.setState({ progress: newProgress, numSkipped: numSkipped, submitReady: ready });
    }
  }

  onPressBack() {
    this.showAndHideQuestions();
    if(this.state.inSubmitScreen) {
      this.setState({ submitReady: false, inSubmitScreen: false })
    } else {
      if(this.state.progress > 0) {
        var newProgress = this.state.progress - 1;
        var numSkipped = this.state.numSkipped;
        while (this.isHidden(this.state.qContent[newProgress])) {
          newProgress--;
          numSkipped--;
        }
        this.setState({
                        progress: newProgress,
                        numSkipped: numSkipped,
                        requiresInput: false,
                        inSubmitScreen: false
                      });
        }
      }
  }

  /**
  * Callback Functions
  */
  openPopup(popupData) {
    this.setState({ popupData: popupData });
    this.popup.show();
  }

  quitScreen() {
    this.props.navigation.goBack();
  }

  keepUserInput(input, id, show, hide, jsonString) {
    var userInput = this.state.userInput;
    for (i=0; i<userInput.length; i++) {
      if (userInput[i] !== undefined && userInput[i].id == id) {
        break;
      }
    }
    userInput[i] = {input: input, json: jsonString, id: id};
    this.setState({ userInput: userInput, toHide: hide, toShow: show, requiresInput: false });
  }

  showAndHideQuestions() {
    var hidden = this.state.hidden;
    if (this.state.toHide != undefined) {
      for (i=0; i<this.state.toHide.length; i++) {
        var duplicate = false;
        for (j=0; j<hidden.length; j++) {
          if (hidden[j] == this.state.toHide[i]) {
            duplicate = true;
            break;
          }
        }
        if (!duplicate) {  hidden.push(this.state.toHide[i]); }
      }
    }
    if (this.state.toShow != undefined) {
      for (i=0; i<hidden.length; i++) {
        for (j=0; j<this.state.toShow.length; j++) {
          if (hidden[i] == this.state.toShow[j]) {
            hidden.splice(i, 1);
          }
        }
      }
    }
    this.setState({ hidden: hidden, toHide: undefined, toShow: undefined });
  }


  /**
  * Render Function
  */
  render() {

    if (this.state.fetched === "true" && !this.state.inSubmitScreen) {
      progressText = (this.state.progress + 1 - this.state.numSkipped) +  " of " + (this.state.qContent.length - this.state.hidden.length);
    } else {
      progressText = "";
    }
    if (this.state.qContent != undefined) { debug = this.state.qContent[this.state.progress].id } else { debug = "" }
    //debug = this.state.userInput[this.state.progress].input; //this.state.submitReady + " " + this.state.requiresInput;
    /*for (i=1; i<this.state.userInput.length; i++) {
      debug = debug + this.state.userInput[i-1].json;
    }*/
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
        <Text>{"Hidden: " + this.state.hidden + "   This: " + debug}</Text>
        <PopupDialog
          ref={(popup) => { this.popup = popup;}}
        >
          <View style={styles.popupContentContainer}>
            <View style={{flex:1, justifyContent: 'center'}}>
              <Text style={styles.popupText}>
                {this.state.popupData}
              </Text>
            </View>
            <Icon
              style={{alignSelf:'flex-end'}}
              onPress={ () => { this.popup.dismiss(); } }
              type='feather'
              name='x'
            />
          </View>
        </PopupDialog>
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
  popupContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'transparent',
  },
  popupText: {
    borderWidth: 5,
    borderColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
  },
});
