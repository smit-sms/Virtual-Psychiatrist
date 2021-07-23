import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

class Radar extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.buttonViewStyle}>
          <Text
            style={{
              color: '#FFFFFF',
              // fontWeight: 'bold',
              fontFamily: 'Montserrat-Bold',
            }}>
            {this.props.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  buttonViewStyle: {
    height: 50,
    paddingHorizontal: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5CA08E',
    borderRadius: 10,
    margin: 18,
  },
};

export {Radar};
