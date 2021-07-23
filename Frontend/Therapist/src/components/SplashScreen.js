//Splash Change
import React, {Component} from 'react';
import {View, Image, Text, ActivityIndicator, Modal} from 'react-native';

class Splash extends Component {
  componentDidMount() {
    console.log('Splash Screen');
    setTimeout(() => {
      // this.props.navigation.replace('IndiaStateScreen');
      this.props.navigation.replace('RegistrationLoginOptionScreen');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Image
          source={require('../assets/Brain1.png')}
          style={{width: 150, height: 150}}
        />
        <ActivityIndicator
          size="large"
          color="#5CA08E"
          style={{marginTop: 20}}
        />
        <View style={styles.footerView}>
          <Text style={styles.textStyle}>Virtual Psychiatrist</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1B1E',
  },
  footerView: {
    position: 'absolute',
    bottom: 10,
  },
  textStyle: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#5CA08E',
  },
};

export default Splash;
