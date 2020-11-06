import React, {Component} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { getPlaceList } from '../api/backend';
import PlaceEach from './PlaceEach';


export default class PlaceList extends Component {
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
        <Text style={styles.title}>지점목록</Text>
        <FlatList data={this.state.placeList}
          renderItem={({item}) => <PlaceEach place={item} navigation={this.props.navigation}/>}
          keyExtractor={(item) => item.id.toString()}
        />
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});