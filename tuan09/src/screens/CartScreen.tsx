import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../store';
import { removeFromCart } from '../store/cartSlice';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CartScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.book.price * i.qty, 0);

  const onCheckout = () => {
    if (user) navigation.navigate('Checkout');
    else navigation.navigate('Login', { redirect: 'goBack' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.book.id)}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.book.title}</Text>
              <Text style={styles.sub}>
                {item.qty} x {item.book.price.toLocaleString('vi-VN')} đ
              </Text>
            </View>
            <PrimaryButton
              variant="outline"
              title="Xoá"
              onPress={() => dispatch(removeFromCart(item.book.id))}
            />
          </View>
        )}
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Tổng: {total.toLocaleString('vi-VN')} đ</Text>
          <PrimaryButton title="Thanh toán" onPress={onCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  title: { fontWeight: '700' },
  sub: { color: '#555' },
  footer: { gap: 8, paddingTop: 8 },
  total: { fontSize: 18, fontWeight: '700' },
});
