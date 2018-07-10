import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Picker
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';


export default class TimeQuestion extends Component<Props> {

  constructor(props){
    super(props);
    this.updatePickerValue = this.updatePickerValue.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateUserInput(index, id) {
    let val = this.props.data.hours_from + (index * this.props.data.hours_step);
    var jsonString = "\"" + id + "\":\"" + val + "\"";
    this.props.updateUserInput(index, id, [], [], jsonString);
  }

  updatePickerValue(index) {
    this.updateUserInput(index, this.props.data.id);
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

  genPickerItems() {
    let items = [];
    let length = this.props.data.hours_to - this.props.data.hours_from;
    length = (length / this.props.data.hours_step) + 1;
    for (i=0; i<length; i++) {
      label = this.props.data.hours_from + (i * this.props.data.hours_step);
      hours = (label != 1 ? ' hours' : ' hour');
      items.push(label + hours);
    }
    return items;
  }

  render() {
    let title = this.props.data.title;
    let tooltipIcon = this.getTooltipIcon();
    let selected = (this.props.value !== undefined ? this.props.value : this.props.data.hours_from);
    let items = this.genPickerItems();
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        {tooltipIcon}
        <View style={styles.textContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selected}
            onValueChange={(value, index) => this.updatePickerValue(index)}>
            {items.map((label, index) =>
              {return (<Picker.Item label={label} value={index} key={index} />)})}
          </Picker>
          <Text>{this.props.value + " " + this.props.data.id}</Text>
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
  picker: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#dddddd',
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'transparent',
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
