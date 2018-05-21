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
import { CheckBox } from 'react-native-elements';
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
    this.setState({checked: checked})
  }

  getSelected() {
    var selected = [];
    for (i=0; i<this.length; i++) {
      if (this.state.checked[i]) { selected.push(i); }
    }
    return selected;
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
    return (
      <View style={styles.mainContainer}>
        <HTMLView
          stylesheet={titleStyles}
          value={"<body>" + title + "</body>"}
        />
        <View style={styles.optionsContainer}>
          <CheckGroup
            options={this.props.data.options}
            updateParent={this.updateCheckBoxes}
            checked={this.state.checked}
          />
          <Text>{this.getSelected()}</Text>
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
