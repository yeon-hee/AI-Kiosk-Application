import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GuestVoicePhase extends Component {
  render() {
    const p = this.props.phase;

    let text = null;
    if (p == 1) {
      text = 'step 1';
    } else if (p == 2) {
      text = 'step 2';
    } else if (p == 3) {
      text = 'step 3';
    }

    return (
      <>
        <View style={s.container}>
          <View style={s.flexContainer}>
            <View style={p == 1 ? s.current : s.dot}></View>
            <View style={p == 2 ? s.current : s.dot}></View>
            <View style={p == 3 ? s.current : s.dot}></View>
          </View>
          <Text style={s.text}>{text}</Text>
        </View>
      </>
    )
  }
}

const s = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 40,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 7,
    height: 7,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#E4DDFA',
  },
  current: {
    width: 7,
    height: 7,
    margin: 2,
    borderRadius: 10,
    backgroundColor: '#AA91FB',
  },
  text: {
    color: 'gray',
  },
});