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

class CheckContent {
  constructor(data) {
    //required
    id = data.id;
    this.title = data.title;
    options = data.options;
    //allowed
    section_start = data.section_start;
    hidden =  data.hidden;
    required = data.required;
    tooltip = data.tooltip; //necessary?
    show_otherwise = data.show_otherwise;
    otherwise_label = data.otherwise_label;
    otherwise_tooltip = data.otherwise_tooltip; //necessary?
    show_after = data.show_after;
    section_end = data.section_end;
  }

  getTitle() {
    return(
      <Text stye={styles.title}>
        {this.title}
      </Text>
    );
  }

  getOptions() {
    return class Options extends Component<Props> {
      render() {
        const numOptions = this.options.length;
        var optionComponents;
        var component;
        for(i=0; i<numOptions; i++) {
          component = new CheckBox(this.options[0]);
          optionComponents.push(component);
        }
        return optionComponents;
      }
    }
  }
}

export default class CheckQuestion extends Component<Props> {

  constructor(props){
    super(props);
    this.state = { content: new CheckContent(props.data) };
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    var title = this.state.content.getTitle();
    return (
      <View>
        {title}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  menuContainer: {
    width: '90%',
    height: '80%',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemContainer: {
    width: '100%',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
  menuItem: {
    width: '90%',
    fontSize: 18,
    color: '#606060',
    textAlign: 'center',
    marginBottom: 5,
  },
});
