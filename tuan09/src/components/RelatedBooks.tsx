import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Book } from '../types';

type Props = { books: Book[]; onPressBook: (id: number) => void };

export default function RelatedBooks({ books, onPressBook }: Props) {
  if (books.length === 0) return null;
  return (
    <View>
      <Text style={styles.title}>Sách liên quan</Text>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => onPressBook(item.id)}>
            <Image source={{ uri: item.image }} style={styles.cover} />
            <Text style={styles.name} numberOfLines={2}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 8 },
  item: { width: 110, marginRight: 12 },
  cover: { width: 110, height: 160, borderRadius: 8, backgroundColor: '#eee' },
  name: { marginTop: 4, fontSize: 13 },
});
