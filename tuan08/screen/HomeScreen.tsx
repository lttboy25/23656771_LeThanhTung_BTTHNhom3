import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch<any>();
  const { token, user } = useSelector((s: any) => s.auth);

  return (
    <View style={s.container}>
      <Text style={s.title}>Home</Text>
      <TouchableOpacity style={s.button} onPress={() => navigation.navigate('Cart')}>
        <Text style={s.buttonText}>Giỏ hàng</Text>
      </TouchableOpacity>

        <TouchableOpacity style={s.button} onPress={() => navigation.navigate('BookDetail')}>
        <Text style={s.buttonText}>Chi tiết sách mẫu</Text>
      </TouchableOpacity>
      {token ? (
        <>
          <Text>Xin chào, {user?.name}</Text>
          <Text>{user?.email}</Text>
          <Text numberOfLines={1}>Token: {token}</Text>
          <TouchableOpacity style={[s.button, { backgroundColor: '#e53935' }]} onPress={() => dispatch(logout())}>
            <Text style={s.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Bạn chưa đăng nhập</Text>
          <TouchableOpacity style={s.button} onPress={() => navigation.navigate('Auth')}>
            <Text style={s.buttonText}>Đăng nhập / Đăng ký</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  button: { backgroundColor: '#1e88e5', padding: 14, borderRadius: 8, marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
});