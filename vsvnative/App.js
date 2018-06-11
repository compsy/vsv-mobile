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
          <ScrollView>
            {responseList}
            <Text>{this.state.checkedResponse}</Text>
          </ScrollView>
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
          submitLoginInfo={this.submitLoginInfo}
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
      var responseURL = 'https://vsv-test.herokuapp.com/api/v1/response/'
        + this.state.responses[this.state.checkedResponse].uuid;
    }
    this.props.navigation.navigate('Question', {selectedURL: responseURL});
  }

  submitLoginInfo(username, password) {
     var url = 'https://vsv-test.herokuapp.com/api/v1/response?external_identifier=' + username;
     this.setState({ loginURL: url });
     return fetch(
       url
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
                        responses: responseJson,
                        loggedIn: true,
                        checkedResponse: -1
                      });
       }
     })
     .catch((error) => {
       console.error(error);
     });
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StatusBar
          barStyle={"dark-content"}
        />
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
      <View style={{flex: 0, justifyContent: 'center', backgroundColor: '#fff'}}>
        <Button
          onPress={() => this.navigateQuestionnaire()}
          title="Test question screen."
          color="#606060"
          fontSize="30"
        />
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
