import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store, useAppDispatch, useAppSelector } from './src/store';
import { restoreSession } from './src/store/authSlice';
import RootNavigator from './src/navigation/RootNavigator';

function Root() {
  const dispatch = useAppDispatch();
  const restoring = useAppSelector((s) => s.auth.restoring);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (restoring) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <RootNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Root />
    </Provider>
  );
}
