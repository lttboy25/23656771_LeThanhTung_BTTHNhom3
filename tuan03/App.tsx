import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BoDem from './components/BoDem';
import Form from './components/Form';
import Timer from './components/Timer';
import ConnectionStatusMonitor from './components/ConnectionStatusMonitor';
import DarkLightMode from './components/DarkLightMode';
import ShareInfomation from './components/ShareInfomation';
import Cart from './components/Cart';

export default function App() {
  
  return (
    <View style={styles.container}>
      {/* <BoDem /> */}

      {/* <Form /> */}

      {/* <Timer /> */}

      {/* <ConnectionStatusMonitor/> */}

      {/* <DarkLightMode /> */}

      {/* <ShareInfomation/> */}

      <Cart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
