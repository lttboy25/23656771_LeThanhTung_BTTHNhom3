import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RatingStars from './RatingStars';
import { Review } from '../types';

type Props = { review: Review; canDelete?: boolean; onDelete?: () => void };

export default function ReviewItem({ review, canDelete, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.head}>
        <Text style={styles.name}>{review.userName}</Text>
        {canDelete && (
          <Pressable onPress={onDelete} hitSlop={8}>
            <Text style={styles.delete}>Xoá</Text>
          </Pressable>
        )}
      </View>
      <RatingStars value={review.rating} size={14} />
      {!!review.comment && <Text style={styles.comment}>{review.comment}</Text>}
      <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc', gap: 3 },
  head: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontWeight: '700' },
  delete: { color: '#c62828' },
  comment: { color: '#333' },
  date: { color: '#888', fontSize: 12 },
});
