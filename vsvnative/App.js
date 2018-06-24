/**
 * U-Can-Act Native App
 * https://github.com/compsy/svs-mobile
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  StatusBar,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CheckBox, Icon } from 'react-native-elements';
import QuestionScreen from './QuestionScreen';
import AuthenticateUser from './Components/AuthenticateUser';


class RadioMulti extends Component<Props> {

  constructor(props) {
      super(props);
      this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked() {
    this.props.onPress(this.props.index)
  }

  render() {
    return(
      <CheckBox
        checked={this.props.checked==this.props.index}
        onPress={this.updateChecked}
        title = {this.props.title}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
      />
    );
  }

}

class HomeScreen extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.submitLoginInfo = this.submitLoginInfo.bind(this);
    this.updateCheckedResponse = this.updateCheckedResponse.bind(this);
  }

  _onPressNothing() {
    Alert.alert('I told you this does nothing.')
  }

  componentWillMount() {
    this.setState({ loggedIn: false });
  }

  getHomeScreenComponent() {
    if (this.state.loggedIn) {
      var responseList = this.populateResponseList();
      if (responseList.length > 0) {
        return(
          <View>
            <View style={{flex: 1}}>
              <ScrollView>
                {responseList}
              </ScrollView>
            </View>
            <View style={{flex: 1}}>
              <Button
                onPress={() => this.navigateQuestionnaire()}
                title="Start Questionnaire"
                color="#606060"
                fontSize="30"
              />
            </View>
          </View>
        );
      } else {
        return(
          <Text style={styles.noQuestionnaires}>
            No questionnaires available at the moment.
          </Text>
        );
      }
    } else {
      return(
        <AuthenticateUser
          updateParentResponses={this.submitLoginInfo}
        />
      );
    }
  }

  updateCheckedResponse(index) {
    this.setState({checkedResponse: index});
  }

  populateResponseList() {
    return(
      this.state.responses.map( (t,i) =>
                            <RadioMulti
                              title={t.questionnaire.title}
                              key={i}
                              index={i}
                              checked={this.state.checkedResponse}
                              onPress={this.updateCheckedResponse}
                            />
                  )
    );
  }

  navigateQuestionnaire() {
    if (this.state.checkedResponse != -1) {
      var responseID = this.state.responses[this.state.checkedResponse].uuid;
      var responseURL = 'https://vsv-test.herokuapp.com/api/v1/response/'
        + responseID;
    }
    this.props.navigation.navigate('Question', {selectedURL: responseURL, responseID: responseID});
  }

  submitLoginInfo(responses) {
    this.setState({
                    responses: responses,
                    loggedIn: true,
                    checkedResponse: -1
                  });

  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
	  <View style={{flex: 1}}>
        <View style={styles.background}>
          <View style={styles.menuContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {this.state.loggedIn ?
                  "Select a questionnaire" : "Log in to access your\nquestionnaires"}
              </Text>
            </View>
            <View style={styles.componentContainer}>
              {this.getHomeScreenComponent()}
            </View>
          </View>
	    </View>
	  </View>
    );
  }
}


const NavStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Question: {
      screen: QuestionScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component<Props> {
  render() {
    return <NavStack/>
  }
}

const styles = StyleSheet.create({
  background: {
	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  menuContainer: {
	minHeight: 350,
    width: '90%',
    height: '55%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  componentContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 26,
    textAlign: 'center',
    margin: 10
  },
  noQuestionnaires: {
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 60,
    borderColor: 'transparent',
    fontWeight: 'bold'
  }
});
