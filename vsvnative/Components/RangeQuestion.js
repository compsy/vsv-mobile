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
import { CheckBox } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';


export default class SliderQuestion extends Component<Props> {

  constructor(props){
    super(props);
    var max = (typeof this.props.data.max === "number") ? this.props.data.max : 100;
    var min = (typeof this.props.data.min === "number") ? this.props.data.min : 0;
    this.state = {
                    value: max/2,
                    sliderMin: min,
                    sliderMax: max
                 };
    this.updateSliderValue = this.updateSliderValue.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentWillReceiveProps(nextProps) {
    var max = (typeof nextProps.data.max === "number") ? nextProps.data.max : 100;
    var min = (typeof nextProps.data.min === "number") ? nextProps.data.min : 0;
    this.setState({
                    value: max/2,
                    sliderMin: min,
                    sliderMax: max
                  });
  }

  updateSliderValue(val) {
    this.setState({value: val})
  }

  render() {
    var title = this.props.data.title;
    var label1 = this.props.data.labels[0];
    var label2 = this.props.data.labels[1];
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            value={this.state.value}
            minimumValue={this.state.sliderMin}
            maximumValue={this.state.sliderMax}
            onValueChange={this.updateSliderValue}
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
