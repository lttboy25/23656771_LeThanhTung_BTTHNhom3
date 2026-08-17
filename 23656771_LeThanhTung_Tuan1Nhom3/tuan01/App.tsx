import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Headers from './components/Headers';
import InfoRow from './components/InfoRow';
import SearchBar from './components/SearchBar';
import ContactInfoRow from './components/ContactInfoRow';
import ActionButton from './components/ActionButton';

export default function App() {
  return (
    <ScrollView>
      <Headers />
      <InfoRow />

      <SearchBar />

      <ContactInfoRow />

      <ActionButton />
    </ScrollView>
  );
}

