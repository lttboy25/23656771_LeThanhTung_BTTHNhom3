import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store';
import HomeScreen from './screen/HomeScreen';
import AuthScreen from './screen/AuthScreen';
import { restoreAuth } from './store/authSlice';
import { ActivityIndicator, View } from 'react-native';
import CartScreen from './screen/CartScreen';
import CheckoutScreen from './screen/CheckoutScreen';
import BookDetailScreen from './screen/BookDetailScreen';


const Stack = createNativeStackNavigator();
function Root() {
  const dispatch = useDispatch<any>();
  const restored = useSelector((s: any) => s.auth.restored);

  useEffect(() => {
    dispatch(restoreAuth());
  }, []);

  if (!restored) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Tài khoản' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Thanh toán' }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Chi tiết sách' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}