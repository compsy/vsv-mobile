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

  componentWillReceiveProps(newProps) {
    var max = (typeof newProps.data.max === "number") ? newProps.data.max : 100;
    var min = (typeof newProps.data.min === "number") ? newProps.data.min : 0;
    if (newProps.index != this.props.index) {
      if (newProps.value == undefined) {
        var val = max/2;
      } else {
        var val = newProps.value;
      }
      this.setState({
                      value: val,
                      sliderMin: min,
                      sliderMax: max
                    });
    }
  }

  componentWillMount() {
    if (this.props.value != undefined) {
      this.setState({value: this.props.value});
    } else {
      var max = (typeof this.props.data.max === "number") ? this.props.data.max : 100;
      var min = (typeof this.props.data.min === "number") ? this.props.data.min : 0;
      this.updateUserInput(max/2)
      this.setState({
                      value: max/2,
                      sliderMin: min,
                      sliderMax: max
                   });
    }
  }

  componentWillUnmount(){
      this.updateUserInput(this.state.value);
  }

  updateUserInput(val) {
    if (val !== undefined) {
      var jsonString = "\"" + this.props.data.id + "\":\"" + val + "\"";
    } else {
      var jsonString = "\"" + this.props.data.id + "\":\"" +  + "\"";
    }
    this.props.updateUserInput(val, this.props.index, [], [], jsonString);
  }

  updateSliderValue(val) {
    this.setState({value: val});
    this.updateUserInput(val);
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
    var title = this.props.data.title;
    var label1 = this.props.data.labels[0];
    var label2 = this.props.data.labels[1];
    var tooltipIcon = this.getTooltipIcon();
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
            value={this.state.value}
            minimumValue={this.state.sliderMin}
            maximumValue={this.state.sliderMax}
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
        <Text style={{alignSelf: 'center'}}>{this.state.value}</Text>
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
