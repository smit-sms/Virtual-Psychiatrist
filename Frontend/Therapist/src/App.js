import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import MainAppRoutes from './routes/MainAppRoutes';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="#000000" />
          <MainAppRoutes />
        </View>
      </Provider>
    );
  }
}

export default App;