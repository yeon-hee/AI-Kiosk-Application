import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import { PlaceContext } from '../context/PlaceContext';

export default class PlaceEach extends Component {
  static contextType = PlaceContext;

  constructor(props) {
    super(props);
  }

  pressBtn = () => {
    // 지점 선택됐을 때, 이 지점 정보 저장하고, 카메라모듈로 이동

    // console.log('목적');
    // console.log(this.props.place);
    // console.log('타겟');
    // console.log(this.context._place);
    // console.log('행위');
    this.context.setPlace({...this.props.place});
    // console.log('결과');
    // console.log(this.context._place);

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