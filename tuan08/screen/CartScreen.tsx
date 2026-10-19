import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function CartScreen({ navigation }: any) {
  const token = useSelector((s: any) => s.auth.token);

  const onCheckout = () => {
    if (!token) {
      navigation.navigate('Auth', { redirectTo: 'Checkout' });
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Giỏ hàng</Text>
      <Text>Sách mẫu x 1 - 100.000đ</Text>
      <TouchableOpacity style={s.button} onPress={onCheckout}>
        <Text style={s.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  button: { backgroundColor: '#1e88e5', padding: 14, borderRadius: 8, marginTop: 16 },
  buttonText: { color: '#fff', fontWeight: '600' },
});