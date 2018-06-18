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
    this.updateRadios = this.updateRadios.bind(this);
    this.tooltipOpen = this.tooltipOpen.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateRadios(checked) {
    this.updateUserInput(checked);
    this.setState({checked: checked});
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
    if (newProps.index != this.props.index) {
      if (newProps.checked === undefined) {
        this.props.requiresInput();
        this.setState({checked: -1});
      } else {
        this.setState({checked: newProps.checked});
      }
    }
  }

  componentWillMount() {
    if (this.props.checked !== undefined) {
      this.setState({checked: this.props.checked});
    } else {
      this.props.requiresInput();
      this.setState({checked: -1});
    }
  }

  updateUserInput(checked) {
    var show = new Array();
    var hide = new Array();
    if (checked != -1) {
      var jsonString = "\"" + this.props.data.id + "\":\""
        + (typeof this.props.data.options[checked] === "string" ? this.props.data.options[checked] : this.props.data.options[checked].title)
        + "\"";
      if (this.props.data.options[checked].shows_questions !== undefined) {
        show = this.props.data.options[checked].shows_questions;
      }
      if (this.props.data.options[checked].hides_questions !== undefined) {
        hide = this.props.data.options[checked].hides_questions;
      }
    }
    if (this.state.checked != -1) {
      if (this.props.data.options[this.state.checked].shows_questions !== undefined) {
        hide = hide.concat(this.props.data.options[this.state.checked].shows_questions);
      }
      if (this.props.data.options[this.state.checked].hides_questions !== undefined) {
        show = show.concat(this.props.data.options[this.state.checked].hides_questions);
      }
    }
    this.props.updateUserInput( checked, this.props.data.id, show, hide, jsonString);
  }

  render() {
    var title = this.props.data.title;
    var tooltipIcon = this.getTooltipIcon();
    var shows = (this.state.checked == -1 || this.props.data.options[this.state.checked].shows_questions === undefined) ? "none" : this.props.data.options[this.state.checked].shows_questions;
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
          <Text>{"Selected: " + this.state.checked + "   Shows: " + shows}</Text>
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
