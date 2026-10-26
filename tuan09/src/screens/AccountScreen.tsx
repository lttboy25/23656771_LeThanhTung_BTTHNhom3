import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Account'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function AccountScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Bạn chưa đăng nhập</Text>
        <PrimaryButton title="Đăng nhập" onPress={() => navigation.navigate('Login')} />
        <PrimaryButton variant="outline" title="Đăng ký" onPress={() => navigation.navigate('Register')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <PrimaryButton title="Đăng xuất" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10, justifyContent: 'center' },
  name: { fontSize: 22, fontWeight: '700' },
  text: { fontSize: 16, color: '#444' },
});
