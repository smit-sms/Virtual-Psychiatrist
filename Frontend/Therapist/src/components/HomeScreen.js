import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import quotes from '../quotes.json';
import Styles from '../Styles';
import {getSessionCount, setSessionCount} from '../actions/ChatAction';
import {connect} from 'react-redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myQuote: null,
    };
  }

  componentDidMount() {
    this.props.getSessionCount();
    console.log(this.props.getCount.sessions_attended);
    var randomNumber = Math.floor(Math.random() * quotes.length);
    var flag = quotes[randomNumber].text;
    console.log('Flag: ', flag);
    this.setState({myQuote: flag});
    // console.log(randomNumber);
    console.log(quotes[randomNumber].text);
  }

  checkSessionCount() {
    // console.log('Random Quote Ayega Idhar Abhi: ', this.state.myQuote);
    if (this.props.getCount.sessions_attended < 5) {
      this.props.navigation.navigate('Chat');
      this.props.setSessionCount();
    } else {
      Alert.alert(
        '',
        "Hey There, It seems that you've achieved enough confidence so why don't you try an actual therapist!",
      );
    }
  }

  render() {
    return (
      // <View style={styles.Container}>
      <View style={Styles.Container}>
        <View style={Styles.Child}>
          <View style={styles.cardStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Image
                style={styles.imageStyle}
                source={require('../assets/Brain.png')}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.mainTextStyle}>Hi, I am Therapist!</Text>
                <Text style={styles.mainTextStyle}>Your AI Friend</Text>
                <TouchableOpacity onPress={() => this.checkSessionCount()}>
                  <View style={[styles.Button, {margin: 10}]}>
                    <Text style={styles.textStyle}>Tap to Chat</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.cardStyle, {padding: 10}]}>
            <Text style={styles.mainTextStyle}>
              Total Sessions Attended: {this.props.getCount.sessions_attended}
            </Text>
            <Text style={styles.mainTextStyle}>
              Sessions Remaining:{' '}
              {Math.abs(this.props.getCount.sessions_attended - 5)}
            </Text>
          </View>
          <View style={[styles.cardStyle, {padding: 10}]}>
            <Text style={styles.mainTextStyle}>Daily Quote:</Text>
            <Text
              style={[
                styles.mainTextStyle,
                {textAlign: 'justify', fontFamily: 'Montserrat-Italic'},
              ]}>
              {/* A failure is not always a mistake, it may simply be the best one can
            do under the circumstances. The real mistake is to stop trying. */}
              {this.state.myQuote}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://open.spotify.com/playlist/2rN3mSrzUcgjlj1TcEDTX7?si=M6De6MFZQ9-ja-mbvvZXxA&nd=1',
              )
            }>
            <View style={[styles.Button, {margin: 20}]}>
              <Text style={styles.textStyle}>
                Want to cheer up your mood? Tap here
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  Container: {
    flex: 1,
    backgroundColor: '#1C1B1E',
  },
  cardStyle: {
    borderWidth: 1,
    borderColor: '#BFBEBE',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  mainTextStyle: {
    color: '#BFBEBE',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
  },
  Button: {
    margin: 20,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5CA08E',
  },
  textStyle: {
    fontSize: 15,
    marginHorizontal: 8,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  imageStyle: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
};

function mapStateToProps(state) {
  return {
    getCount: state.chatscreen.getCount,
    setCount: state.chatscreen.setCount,
  };
}

export default connect(mapStateToProps, {
  getSessionCount,
  setSessionCount,
})(HomeScreen);
