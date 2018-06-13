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


class CheckBoxMulti extends Component<Props> {

  constructor(props) {
      super(props);
      this.state = {checked: false};
      this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked() {
    this.props.onPress(this.props.index)
  }

  render() {
    return(
      <CheckBox
        checked={this.props.checked}
        onPress={this.updateChecked}
        title = {this.props.title}
      />
    );
  }

}

class CheckGroup extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { numOptions: this.props.options.length}
    this.updateChecked = this.updateChecked.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  updateChecked(box) {
    var checked = this.props.checked;
    checked[box] = !checked[box];
    this.updateParent(checked);
  }

  updateParent(checked) {
    this.props.updateParent(checked);
  }

  genCheckboxes() {
    return(
      this.props.options.map( (t,i) =>
                              <CheckBoxMulti
                                title={typeof t === "string" ? t : t.title}
                                key={i}
                                index={i}
                                checked={this.props.checked[i]}
                                onPress={this.updateChecked}
                              />)
    );
  }


  render() {
    var checkboxes = this.genCheckboxes();
    return(
      <View>{checkboxes}</View>
    );
  }

}

export default class CheckQuestion extends Component<Props> {

  constructor(props){
    super(props);
    var checked = [];
    this.length = this.props.data.options.length;
    for (i=0; i<this.length; i++) {
      checked[i] = false;
    }
    this.state = {
                    checked: checked,
                 };
    this.getSelected = this.getSelected.bind(this);
    this.updateCheckBoxes = this.updateCheckBoxes.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  updateCheckBoxes(checked) {
    this.updateUserInput(checked);
    this.setState({checked: checked});
  }

  getSelected() {
    var selected = [];
    for (i=0; i<this.length; i++) {
      if (this.state.checked[i]) { selected.push(i); }
    }
    return selected;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.index != this.props.index) {
      if (newProps.checked === undefined) {
        var checked = [];
        this.length = this.props.data.options.length;
        for (i=0; i<this.length; i++) {
          checked[i] = false;
        }
        if (this.props.data.required !== undefined && this.props.data.required == true){
          this.props.requiresInput();
        }
        this.setState({checked: checked});
        this.updateUserInput(this.getSelected(checked));
      } else {
        this.setState({checked: newProps.checked});
      }
    }
  }

  componentWillMount() {
    if (typeof this.props.checked !== "undefined") {
      this.setState({checked: this.props.checked});
    } else {
      this.updateUserInput(this.state.checked);
      if (this.props.data.required !== undefined && this.props.data.required == true){
        this.props.requiresInput();
      }
    }
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

  generateJson(i) {
    return(
      "\"" + this.props.data.id + "_"
      + (typeof this.props.data.options[i] === "string" ? this.props.data.options[i] : this.props.data.options[i].title)
      + "\":\"true\","
    )
  }

  updateUserInput(checked) {
    var show = [];
    var hide = [];
    var jsonString = "";
    for (i=0; i<checked.length; i++) {
      if (checked[i]) {
        jsonString = jsonString + this.generateJson(i);
        if (this.props.data.shows_questions !== undefined) {
          show = show.concat(this.props.data.options[i].shows_questions);
        }
        if (this.props.data.hides_questions !== undefined) {
          hide = hide.concat(this.props.data.options[i].hides_questions);
        }
      }
      if (this.state.checked[i] && !checked[i]) {
        if (this.props.data.shows_questions !== undefined) {
          hide = hide.concat(this.props.data.options[i].shows_questions);
        }
        if (this.props.data.hides_questions !== undefined) {
          show = show.concat(this.props.data.options[i].hides_questions);
        }
      }
    }
    jsonString = jsonString.slice(0, -1);
    this.props.updateUserInput(checked, this.props.index,
                               show, hide, jsonString);
  }

  render() {
    var title = this.props.data.title;
    var tooltipIcon = this.getTooltipIcon();
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        {tooltipIcon}
        <View style={styles.optionsContainer}>
          <CheckGroup
            options={this.props.data.options}
            updateParent={this.updateCheckBoxes}
            checked={this.state.checked}
          />
          <Text>{"Selected: " + this.getSelected()}</Text>
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
    flex: 1,
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
