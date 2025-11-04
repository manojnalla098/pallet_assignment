import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/redux/Store';
import SplaseScreen from './src/screens/SplaseScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductInfoScreen from './src/screens/ProductInfoScreen';
import CartScreen from './src/screens/CartScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplaseScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SplaseScreen" component={SplaseScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen
            name="barcodeScanner"
            component={BarcodeScannerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default () => {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};
