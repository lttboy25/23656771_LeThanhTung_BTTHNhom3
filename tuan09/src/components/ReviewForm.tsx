import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RatingStars from './RatingStars';
import PrimaryButton from './PrimaryButton';

type Props = { onSubmit: (rating: number, comment: string) => Promise<void> };

export default function ReviewForm({ onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handle = async () => {
    if (rating < 1) {
      setError('Vui lòng chọn số sao');
      return;
    }
    setError('');
    setSending(true);
    try {
      await onSubmit(rating, comment.trim());
      setRating(0);
      setComment('');
    } catch (err: any) {
      const status = err?.response?.status;
      setError(
        status === 401
          ? 'Phiên đăng nhập đã hết hạn'
          : status === 403
          ? 'Bạn không có quyền gửi đánh giá này'
          : 'Không gửi được đánh giá'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.box}>
      <RatingStars value={rating} size={28} onChange={setRating} />
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Viết nhận xét..."
        placeholderTextColor="#999"
        multiline
        style={styles.input}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <PrimaryButton
        title={sending ? 'Đang gửi...' : 'Gửi đánh giá'}
        onPress={handle}
        disabled={sending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { gap: 10, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  error: { color: '#c62828' },
});
