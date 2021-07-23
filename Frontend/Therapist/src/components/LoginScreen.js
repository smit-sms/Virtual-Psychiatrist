import React, {Component} from 'react';
import {View, Text, Image, Modal, TouchableOpacity, Alert} from 'react-native';
import {getEmail, getPassword, loginCheck} from '../actions';
import {Input, Button} from './common';
import {connect} from 'react-redux';

class LoginScreen extends Component {
  componentDidMount() {
    this.props.getEmail('');
    this.props.getPassword('');
  }
  checkLogin(email, password) {
    this.props.loginCheck(email, password, this.props);
    // console.log('Check Status', this.props.loginStatus);
    // console.log(this.props);
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
          Login
        </Text>
        <Input
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={this.props.email}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(value) => this.props.getEmail(value)}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#FFF"
          value={this.props.password}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(value) => this.props.getPassword(value)}
        />
        <Text
          style={{
            color: '#FFFFFF',
            marginLeft: 30,
            fontFamily: 'Montserrat-Regular',
          }}>
          Don't have an account?{' '}
          <Text
            style={{
              color: '#5CA08E',
              textAlignVertical: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            onPress={() => this.props.navigation.navigate('Registration')}>
            Signup
          </Text>
        </Text>
        <Button
          label="Login"
          // onPress={() => {
          //   // return this.props.loginCheck(this.props.email, this.props.password);
          //   return this.checkLogin(
          //     this.props.email,
          //     this.props.password,
          //     this.props,
          //   );
          // }}
          onPress={() => {
            if (this.props.email !== '' && this.props.password !== '') {
              var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (regEmail.test(this.props.email) === false) {
                Alert.alert('Please provide valid email id!');
              } else {
                return this.checkLogin(
                  this.props.email,
                  this.props.password,
                  this.props,
                );
              }
            } else {
              Alert.alert('Please input all the fields!');
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
    fontFamily: 'Montserrat-Regular',
  },
};

function mapStateToProps(state) {
  return {
    email: state.loginscreen.email,
    password: state.loginscreen.password,
    loginStatus: state.loginscreen.loginStatus,
  };
}

export default connect(mapStateToProps, {getEmail, getPassword, loginCheck})(
  LoginScreen,
);
