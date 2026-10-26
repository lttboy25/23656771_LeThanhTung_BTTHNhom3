import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Book } from '../types';

type Props = { book: Book; onPress: () => void };

export default function BookCard({ book, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: book.image }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.category}>{book.category}</Text>
        <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  cover: { width: 70, height: 105, borderRadius: 6, backgroundColor: '#eee' },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: '700', fontSize: 16 },
  author: { color: '#555' },
  category: { color: '#1565c0' },
  price: { color: '#c62828', fontWeight: '700', marginTop: 4 },
});
