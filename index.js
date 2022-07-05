/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Home from './src/Screens/Home';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Colors from './src/constants/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import History from './src/Screens/History';
import Settings from './src/Screens/Settings';

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

const Tab = createBottomTabNavigator();

const Root = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            headerShown: false,
            tabBarActiveTintColor: Colors.green500,
            tabBarInactiveTintColor: 'gray',
            tabBarActiveBackgroundColor: Colors.background,
            tabBarInactiveBackgroundColor: Colors.background,
            tabBarStyle: {
              backgroundColor: Colors.background,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = 'home-outline';
                  break;
                case 'History':
                  iconName = 'list-outline';
                  break;
                case 'Settings':
                  iconName = 'settings-outline';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
    <Toast config={toastConfig} />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
