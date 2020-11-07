import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { setPlace } from '../store/modules/place';

class PlaceEach extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.place);
    setPlace(this.props.place);
  }
  pressBtn = () => {
    console.log('asdfasdf');
    console.log(this.props.place.name);
    setPlace(this.props.place);

    // this.props.navigation.navigate('Camera');
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

const mapStateToProps = state => ({
  _place: state.placeReducer._place
});

const mapDispatchToProps = dispatch => ({
  setPlace: place => dispatch(setPlace(place)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceEach);