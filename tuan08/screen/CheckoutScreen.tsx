import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function CheckoutScreen({ navigation }: any) {
  const { token, user } = useSelector((s: any) => s.auth);

  useEffect(() => {
    if (!token) navigation.replace('Auth', { redirectTo: 'Checkout' });
  }, [token]);

  if (!token) return null;

  return (
    <View style={s.container}>
      <Text style={s.title}>Thanh toán</Text>
      <Text>Người mua: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
});