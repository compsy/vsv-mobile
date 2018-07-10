import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';


export default class TextfieldQuestion extends Component<Props> {

  constructor(props){
    super(props);
    this.updateTextValue = this.updateTextValue.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateUserInput(text, id) {
    var jsonString = "\"" + id + "\":\"" + text + "\"";
    this.props.updateUserInput(text, id, [], [], jsonString);
  }

  updateTextValue(text) {
    this.updateUserInput(text, this.props.data.id);
  }

  getTooltipIcon() {
    if (typeof this.props.data.tooltip === "string") {
      return(
        <Icon
          style={{flex: 1}}
          type='ionicon'
          name='md-information-circle'
          color='#009A74'
          onPress={() => {this.tooltipOpen(this.props.data.tooltip);}}
        />
      );
    }
  }

  tooltipOpen(text) {
    this.props.openPopup(text);
  }

  render() {
    let title = this.props.data.title;
    let placeholder = (this.props.data.placeholder !== undefined ? this.props.data.placeholder : "");
    let tooltipIcon = this.getTooltipIcon();
    let text = (this.props.text !== undefined ? this.props.text : "");
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        {tooltipIcon}
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            value={text}
            onChangeText={(string) => this.updateTextValue(string)}
            placeholder={placeholder}
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
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'transparent',
    fontSize: 26,
    height: '50%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
});

const titleStyles = StyleSheet.create({
  body: {
    fontSize: 28,
    textAlign: 'center',
  },
  strong: {
    fontWeight: 'bold',
    fontSize: 28,
  },
});
