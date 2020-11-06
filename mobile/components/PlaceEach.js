import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class PlaceEach extends Component {
  constructor(props) {
    super(props);
  }

  pressBtn = () => {
    console.log(this.props.place.name);
    this.props.navigation.navigate('Camera');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.pressBtn}
        >
          <Text>{this.props.place.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
  },
  button: {

  }
});