import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Styles from '../Styles';
import {getMyProfile} from '../actions/MyProfileAction';
import {getAnalysis} from '../actions/AnalysisAction';
import {connect} from 'react-redux';

class DetailsScreen extends Component {

  componentDidMount() {
    // console.log('Inside Details Screen.');
    this.props.getMyProfile();
    this.props.getAnalysis();
    console.log('Check Please: ', this.props.analysis);
    // console.log(this.state.demo[0].id);
    // console.log('Idhar Check', this.props.analysis);
    // console.log(demo.analysis[0]);
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  renderImage = () => {
    this.setState({
      isVisible: true,
      modalVisible: false,
    });
  };


  render() {
    console.log('Idhar URL Check Kar', this.state.imgURL);
    const {modalVisible} = this.state;
    return (
      // <View style={{backgroundColor: '#1C1B1E', height: '100%'}}>
      <View style={Styles.Container}>
        <View style={Styles.Child}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.overlayViewStyle}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTextStyle}>Select Your Session</Text>
                  <View style={styles.bottomLine} />
                  <FlatList
                    // data={this.state.demo}
                    data={this.props.analysis}
                    keyExtractor={(item) => {
                      return item.id.toString();
                    }}
                    renderItem={(message) => {
                      const item = message.item;
                      console.log('Flatlist: ', item);
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => this.processImage(item.id)}>
                            <Text style={styles.modalTextStyle}>
                              Session {item.id}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                  <View style={styles.bottomLine} />
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Text
                      style={[
                        styles.modalTextStyle,
                        {
                          color: '#5CA08E',
                          alignSelf: 'flex-end',
                          marginRight: 10,
                        },
                      ]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.rowStyle}>
            <Text style={styles.labelStyle}>Name: </Text>
            <Text style={styles.profileValueStyle}>
              {this.props.myProfile.name}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.labelStyle}>Email Id:</Text>
            <Text style={styles.profileValueStyle}>
              {this.props.myProfile.email}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <View style={styles.Button}>
              <Text style={styles.textStyle}>Tap for Analysis</Text>
              <Icon name={'caretdown'} size={25} color={'#FFFFFF'} />
            </View>
          </TouchableOpacity>          
          {this.state.isVisible ? (
            <View style={styles.imageView}>
              <Image
                style={{
                  flex: 1,
                  width: 380,
                  height: 380,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: this.state.imgURL,
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = {
  rowStyle: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    height: 40,
    borderRadius: 10,
    borderColor: '#BFBEBE',
  },
  labelStyle: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#5CA08E',
  },
  profileValueStyle: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: '#BFBEBE',
  },
  Button: {
    margin: 20,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#5CA08E',
  },
  bottomLine: {
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  textStyle: {
    fontSize: 20,
    paddingRight: 10,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  overlayViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#1C1B1E',
    borderRadius: 10,
    // margin: 55,
    width: '60%',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTextStyle: {
    color: '#BFBEBE',
    marginLeft: 10,
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 10,
  },
  buttonStyle: {
    color: 'green',
    alignSelf: 'right',
  },
  imageView: {
    flex: 1,
    marginTop: -15,
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return {
    myProfile: state.myprofilescreen.myProfile,
    analysis: state.analysisscreen.analysis,
  };
}

export default connect(mapStateToProps, {
  getMyProfile,
  getAnalysis,
})(DetailsScreen);
