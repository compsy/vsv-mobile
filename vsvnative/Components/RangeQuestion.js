import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Slider
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';


export default class SliderQuestion extends Component<Props> {

  constructor(props){
    super(props);
    this.updateSliderValue = this.updateSliderValue.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    this.updateUserInput((typeof this.props.data.max === "number" ? this.props.data.max/2 : 50), this.props.data.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id != this.props.data.id) {
      if (typeof nextProps.value !== "number") {
        this.updateUserInput((typeof nextProps.data.max === "number" ? nextProps.data.max/2 : 50), nextProps.data.id);
      }
    }
  }

  updateUserInput(val, id) {
    var jsonString = "\"" + id + "\":\"" + val + "\"";
    this.props.updateUserInput(val, id, [], [], jsonString);
  }

  updateSliderValue(val) {
    this.updateUserInput(val, this.props.data.id);
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
    let max = (typeof this.props.data.max === "number") ? this.props.data.max : 100;
    let min = (typeof this.props.data.min === "number") ? this.props.data.min : 0;
    let title = this.props.data.title;
    let label1 = this.props.data.labels[0];
    let label2 = this.props.data.labels[1];
    let tooltipIcon = this.getTooltipIcon();
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        {tooltipIcon}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            value={this.props.value}
            minimumValue={min}
            maximumValue={max}
            onSlidingComplete={this.updateSliderValue}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={{flex: 1, textAlign: 'left'}}>
            {label1}
          </Text>
          <Text style={{flex: 1, textAlign: 'right'}}>
            {label2}
          </Text>
        </View>
        <Text style={{alignSelf: 'center'}}>{this.props.value}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  slider: {
    width: '95%',
  },
  labelContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelText: {
    flex: 1,
    alignSelf: 'flex-start',
    textAlign: 'center',
    backgroundColor: '#387872'
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
