import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Headers from './components/Headers';
import InfoRow from './components/InfoRow';
import SearchBar from './components/SearchBar';
import ContactInfoRow from './components/ContactInfoRow';
import ActionButton from './components/ActionButton';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Headers />
      <InfoRow />

      <SearchBar />

      <ContactInfoRow />

      <ActionButton
        title="LƯU HỒ SƠ"
        onPress={() => {}}
        accessibilityLabel="Lưu hồ sơ sinh viên"
        accessibilityHint="Nhấn để lưu thông tin hồ sơ hiện tại"
      />

      <ActionButton
        title="XÓA HỒ SƠ"
        disabled
        accessibilityLabel="Xóa hồ sơ sinh viên"
        accessibilityHint="Chức năng hiện đang bị vô hiệu hóa"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  }
});