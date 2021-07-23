import React, {Component} from 'react';
import {View, Text, Image, Modal, TouchableOpacity, Alert} from 'react-native';
import {
  getRegName,
  getRegEmail,
  getRegPassword,
  registrationCheck,
} from '../actions';
import {Input, Button} from './common';
import {connect} from 'react-redux';

class RegistrationScreen extends Component {

  componentDidMount() {
    this.props.getRegName('');
    this.props.getRegEmail('');
    this.props.getRegPassword('');
  }

  checkRegistration(name, email, password) {
    this.props.registrationCheck(name, email, password, this.props);
    // console.log(this.props);
    // console.log('Check Status', this.props.loginStatus);
  }
  render() {
    return (
      <View style={styles.Container}>
        <Text
          style={[
            styles.textStyle,
            {
              alignSelf: 'center',
              marginLeft: -15,
              fontSize: 30,
              marginBottom: 30,
              fontFamily: 'Montserrat-Bold',
            },
          ]}>
          Virtual Psychiatrist
        </Text>
        <Image
          source={require('../assets/Brain1.png')}
          style={styles.imageStyle}
        />
        <Text style={[styles.textStyle, {fontFamily: 'Montserrat-Bold'}]}>
          Registration
        </Text>
        <Input
          placeholder="Name"
          placeholderTextColor="#FFF"
          value={this.props.regName}
          onChangeText={(value) => this.props.getRegName(value)}
        />
        <Input
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={this.props.regEmail}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(value) => this.props.getRegEmail(value)}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#FFF"
          value={this.props.regPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(value) => this.props.getRegPassword(value)}
        />
        <Text
          style={{
            color: '#FFFFFF',
            marginLeft: 30,
            fontFamily: 'Montserrat-Regular',
          }}>
          Already Registered ?{' '}
          <Text
            style={{
              color: '#5CA08E',
              textAlignVertical: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            onPress={() => this.props.navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
        <Button
          label="Register"
          // onPress={() => {
          //   // return this.props.loginCheck(this.props.email, this.props.password);
          //   return this.checkRegistration(
          //     this.props.regName,
          //     this.props.regEmail,
          //     this.props.regPassword,
          //     this.props,
          //   );
          // }}
          onPress={() => {
            if (
              this.props.regName !== '' &&
              this.props.regEmail !== '' &&
              this.props.regPassword !== ''
            ) {
              var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (regEmail.test(this.props.regEmail) === false) {
                Alert.alert('Please provide valid email id!');
              } else {
                return this.checkRegistration(
                  this.props.regName,
                  this.props.regEmail,
                  this.props.regPassword,
                  this.props,
                );
              }
            } else {
              Alert.alert("Input fields can't be empty");
            }
          }}
        />
      </View>
    );
  }
}

const styles = {
  Container: {
    height: '100%',
    backgroundColor: '#1C1B1E',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 120,
    width: 120,
    marginTop: -10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  textStyle: {
    marginLeft: 30,
    marginBottom: 20,
    fontSize: 20,
    color: '#5CA08E',
  },
};

function mapStateToProps(state) {
  return {
    regName: state.loginscreen.regName,
    regEmail: state.loginscreen.regEmail,
    regPassword: state.loginscreen.regPassword,
    registrationCheck: state.loginscreen.registrationCheck,
  };
}

export default connect(mapStateToProps, {
  getRegName,
  getRegEmail,
  getRegPassword,
  registrationCheck,
})(RegistrationScreen);
