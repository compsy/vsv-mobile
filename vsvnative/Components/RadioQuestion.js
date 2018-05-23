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
import { CheckBox, Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';


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

class RadioGroup extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { numOptions: this.props.options.length}
    this.updateChecked = this.updateChecked.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  updateChecked(checked) {
    this.updateParent(checked);
  }

  updateParent(checked) {
    this.props.updateParent(checked);
  }

  genRadios() {
    return(
      this.props.options.map( (t,i) =>
                              <RadioMulti
                                title={typeof t === "string" ? t : t.title}
                                key={i}
                                index={i}
                                checked={this.props.checked}
                                onPress={this.updateChecked}
                              />)
    );
  }

  render() {
    var radios = this.genRadios();
    return(
      <View>{radios}</View>
    );
  }

}

export default class RadioQuestion extends Component<Props> {

  constructor(props){
    super(props);
    checked = -1;
    this.state = {
                    checked: checked,
                 };
    this.updateRadios = this.updateRadios.bind(this);
    this.tooltipOpen = this.tooltipOpen.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateRadios(checked) {
    this.setState({checked: checked})
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

  componentWillReceiveProps(newProps) {
    if(newProps.index != this.props.index) {
      this.props.updateUserInput(this.state.checked, this.props.index);
    }
    if (typeof newProps.checked !== "undefined") {
      this.setState({checked: newProps.checked});
    }
  }

  componentWillMount() {
    if (typeof this.props.checked !== "undefined") {
      this.setState({checked: this.props.checked});
    }
  }

  componentWillUnmount() {
    this.props.updateUserInput(this.state.checked, this.props.index);
  }

  render() {
    var title = this.props.data.title;
    var tooltipIcon = this.getTooltipIcon();
    return (
      <View>
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        {tooltipIcon}
        <View style={styles.optionsContainer}>
          <RadioGroup
            options={this.props.data.options}
            updateParent={this.updateRadios}
            checked={this.state.checked}
          />
          <Text>{this.state.checked}</Text>
        </View>
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
  optionsContainer: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
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
