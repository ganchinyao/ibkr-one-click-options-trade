/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Colors from './src/constants/Colors';

const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Colors.green700 }}
      contentContainerStyle={{
        backgroundColor: Colors.green500,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
      text1Style={{
        fontSize: 16,
        color: Colors.white,
      }}
      text2Style={{
        fontSize: 16,
        color: Colors.white,
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.red700 }}
      contentContainerStyle={{
        backgroundColor: Colors.red500,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
      text1Style={{
        fontSize: 16,
        color: Colors.white,
      }}
      text2Style={{
        fontSize: 16,
        color: Colors.white,
      }}
    />
  ),
};

const Root = () => (
  <Provider store={store}>
    <App />
    <Toast config={toastConfig} />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
