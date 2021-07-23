import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  addNavigationHelpers,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import HomeScreen from '../components/HomeScreen';
import ChatScreen from '../components/ChatScreen';
import DetailsScreen from '../components/DetailsScreen';
import {
  getInputMessage,
  sendMessageInput,
  getMessage,
  getSessionCount,
  clearChat,
} from '../actions/ChatAction';
import {connect} from 'react-redux';

const RootStack = createStackNavigator();
const RegistrationLoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const RegistrationLoginScreen = () => {
  return (
    <RegistrationLoginStack.Navigator screenOptions={{headerShown: false}}>
      <RegistrationLoginStack.Screen name="Login" component={LoginScreen} />
      <RegistrationLoginStack.Screen
        name="Registration"
        component={RegistrationScreen}
      />
    </RegistrationLoginStack.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#1C1B1E',
            borderBottomColor: '#BFBEBE',
            borderWidth: 1,
          },
          headerTintColor: '#5CA08E',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const ChatScreenStack = () => {
  // console.log('Navigation', navigation);
  // console.log('Navigation', props);
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#1C1B1E',
            borderBottomColor: '#BFBEBE',
            borderWidth: 1,
          },
          headerTintColor: '#5CA08E',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              onPressIn={clearChat()}>
              <Icon2
                style={{margin: 10}}
                size={25}
                color="#5CA08E"
                name={'arrow-back'}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
        }}
      />
    </ChatStack.Navigator>
  );
};

const DetailsScreenStack = () => {
  return (
    <DetailsStack.Navigator>
      <DetailsStack.Screen
        name="Profile"
        component={DetailsScreen}
        options={{
          title: 'My Profile',
          headerStyle: {
            backgroundColor: '#1C1B1E',
            borderBottomColor: '#BFBEBE',
            borderWidth: 1,
          },
          headerTintColor: '#5CA08E',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
        }}
      />
    </DetailsStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        // inactiveBackgroundColor: '#1C1B1E',
        // activeBackgroundColor: '#1C1B1E',
        labelStyle: {
          fontFamily: 'Montserrat-Medium',
        },
        inactiveBackgroundColor: '#5CA08E',
        activeBackgroundColor: '#5CA08E',
        activeTintColor: '#1C1B1E',
        inactiveTintColor: '#BFBEBE',
        keyboardHidesTabBar: true,
        style: {
          borderTopWidth: 0,
          borderTopColor: '#BFBEBE',
        },
      }}>
      <MainTab.Screen name="Home" component={HomeScreenStack} />
      <MainTab.Screen name="Profile" component={DetailsScreenStack} />
    </MainTab.Navigator>
  );
};

const MainAppRoutes = ({navigation, props}) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="RegistrationLoginOptionScreen"
          component={RegistrationLoginScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Chat"
          component={ChatScreenStack}
          options={{headerShown: false}}
          // options={{
          //   title: 'Chat',
          //   headerStyle: {
          //     backgroundColor: '#1C1B1E',
          //     borderBottomColor: '#BFBEBE',
          //     borderWidth: 1,
          //   },
          //   headerTintColor: '#5CA08E',
          //   headerLeft: () => (
          //     <TouchableOpacity onPress={() => navigation.navigate('MainTab')}>
          //       <Icon2
          //         style={{margin: 10}}
          //         size={25}
          //         color="#5CA08E"
          //         name={'arrow-back'}
          //       />
          //     </TouchableOpacity>
          //   ),
          //   headerTitleStyle: {
          //     fontFamily: 'Montserrat-Bold',
          //   },
          // }}
        />
        <RootStack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  return {
    // messageTyping: state.chatscreen.messageTyping,
    // sendMessage: state.chatscreen.sendMessage,
    // receiveMessage: state.chatscreen.receiveMessage,
    // getCount: state.chatscreen.getCount,
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps, {
  clearChat,
})(MainAppRoutes);

// export default MainAppRoutes;
