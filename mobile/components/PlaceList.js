import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { getPlaceList } from '../api/backend';
import PlaceEach from './PlaceEach';

import { PlaceContext } from '../context/PlaceContext';

export default class PlaceList extends Component {
  static contextType = PlaceContext;

  state = {
    placeList: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getPlaceList(null, this.saveRes, this.errorRes);
  }

  saveRes = (res) => {
    this.setState({placeList: res.data});
  }

  errorRes = (res) => {
    console.log(res);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>지점목록</Text>
        </View>
        <FlatList style={styles.flatList} data={this.state.placeList}
          renderItem={({item}) => <PlaceEach place={item} navigation={this.props.navigation}/>}
          keyExtractor={(item) => item.id.toString()}
        />

        <Text>선택된 지점: {this.context._place.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    alignSelf: 'stretch',
  },
  titleContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#AA91FB',
    padding: 20,
  },
  title: {
    color: '#53477A',
    fontSize: 30,
    fontFamily: 'Jua-Regular',
    textAlign: 'center',
  },
});