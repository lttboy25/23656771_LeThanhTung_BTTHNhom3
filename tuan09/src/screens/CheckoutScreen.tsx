import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store';
import { clearCart } from '../store/cartSlice';

export default function CheckoutScreen({ navigation }: ScreenProps<'Checkout'>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.book.price * i.qty, 0);

  const confirm = () => {
    dispatch(clearCart());
    Alert.alert('Thành công', 'Đặt hàng thành công', [
      { text: 'OK', onPress: () => navigation.navigate('Tabs', { screen: 'Home' }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.line}>Người nhận: {user?.name}</Text>
      <Text style={styles.line}>Email: {user?.email}</Text>
      <Text style={styles.line}>Số mặt hàng: {items.length}</Text>
      <Text style={styles.total}>Tổng: {total.toLocaleString('vi-VN')} đ</Text>
      <PrimaryButton title="Xác nhận đặt hàng" onPress={confirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  line: { fontSize: 16 },
  total: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
});
