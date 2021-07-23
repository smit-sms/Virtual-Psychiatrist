import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import Tts from 'react-native-tts';
import ImagePicker from 'react-native-image-crop-picker';
import SpeechToText from 'react-native-google-speech-to-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getInputMessage,
  sendMessageInput,
  getMessage,
  getSessionCount,
  clearChat,
} from '../actions/ChatAction';
import {connect} from 'react-redux';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    // this.props.getMessage();
    // this.props.sendMessageInput();    
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                value={this.props.messageTyping}
                style={styles.inputs}
                placeholderTextColor={'#FFFFFF'}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.props.getInputMessage(text)}
              />
            </View>
            <View style={{marginRight: 10}}>
              <TouchableOpacity
                onPress={() => this.speechToTextHandler()}
                style={styles.btnSend}>
                <Icon name={'mic'} size={30} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnSend}
              // onPress={
              //   () => this.sendReceiveHelperFunction(this.props.messageTyping)
              // }>
              onPress={() => {
                if (this.props.messageTyping !== '') {
                  this.sendReceiveHelperFunction(this.props.messageTyping);
                } else {
                  Alert.alert("Message Can't be empty!");
                }
              }}>
              <Icon name={'send'} size={30} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 15,
    backgroundColor: '#1C1B1E',
  },
  footer: {
    flexDirection: 'row',
    // height: 60,
    // borderTopColor: '#0F974F',
    // borderWidth: 1,
    backgroundColor: '#424242',
    // backgroundColor: '#1C1B1E',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#5CA08E',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    backgroundColor: '#5CA08E',
    borderRadius: 30,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontFamily: 'Montserrat-Regular',
  },
  textStyle: {
    color: '#FFFFFF',
    textAlign: 'justify',
    fontFamily: 'Montserrat-Regular',
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  itemIn: {
    alignSelf: 'flex-start',
    backgroundColor: '#5CA08E',
    // backgroundColor: '#2E856E',
    // backgroundColor: '#1C1B1E',
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#BFBEBE',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 2,
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#FFFFFF',
    // backgroundColor: '#0F974F',
    borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 5,
    // transform: [{scaleY: -1}],
  },
});

function mapStateToProps(state) {
  return {
    messageTyping: state.chatscreen.messageTyping,
    sendMessage: state.chatscreen.sendMessage,
    receiveMessage: state.chatscreen.receiveMessage,
    getCount: state.chatscreen.getCount,
  };
}

export default connect(mapStateToProps, {
  getInputMessage,
  sendMessageInput,
  getMessage,
  getSessionCount,
  clearChat,
})(ChatScreen);
