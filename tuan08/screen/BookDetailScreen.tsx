import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import RatingStars from '../components/RatingStars';
import { Review, reviewService, calcAverage } from '../utils/reviewService';

const SAMPLE_BOOK = { id: '1', title: 'Lập trình React Native', author: 'IUH' };

export default function BookDetailScreen({ navigation, route }: any) {
  const book = route.params?.book ?? SAMPLE_BOOK;
  const { token, user } = useSelector((s: any) => s.auth);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Điểm trung bình tính lại tự động mỗi khi reviews đổi
  const average = useMemo(() => calcAverage(reviews), [reviews]);

  useEffect(() => {
    reviewService.getReviews(book.id).then(data => {
      setReviews(data);
      setLoading(false);
    });
  }, [book.id]);

  const onSubmit = async () => {
    const errs: { rating?: string; comment?: string } = {};
    if (rating < 1) errs.rating = 'Vui lòng chọn số sao';
    if (!comment.trim()) errs.comment = 'Vui lòng nhập bình luận';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setSubmitting(true);
      const newReview = await reviewService.postReview(book.id, {
        userName: user?.name ?? 'Ẩn danh',
        rating,
        comment: comment.trim(),
      });
      // Cập nhật danh sách tại chỗ, không load lại trang
      setReviews(prev => [newReview, ...prev]);
      setRating(0);
      setComment('');
    } catch {
      Alert.alert('Lỗi', 'Gửi đánh giá thất bại, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>{book.title}</Text>
      <Text style={s.author}>{book.author}</Text>

      {/* Điểm trung bình */}
      <View style={s.summary}>
        <Text style={s.avg}>{average.toFixed(1)}</Text>
        <View style={{ marginLeft: 12 }}>
          <RatingStars value={average} size={22} />
          <Text style={s.count}>{reviews.length} đánh giá</Text>
        </View>
      </View>

      {/* Form gửi đánh giá */}
      <Text style={s.section}>Viết đánh giá</Text>
      {token ? (
        <View>
          <RatingStars value={rating} size={32} onChange={setRating} />
          {!!errors.rating && <Text style={s.error}>{errors.rating}</Text>}

          <TextInput
            style={s.input}
            placeholder="Nhập bình luận của bạn"
            multiline
            value={comment}
            onChangeText={setComment}
          />
          {!!errors.comment && <Text style={s.error}>{errors.comment}</Text>}

          <TouchableOpacity style={s.button} onPress={onSubmit} disabled={submitting}>
            {submitting
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.buttonText}>Gửi đánh giá</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={s.button} onPress={() => navigation.navigate('Auth', { goBack: true })}>
          <Text style={s.buttonText}>Đăng nhập để đánh giá</Text>
        </TouchableOpacity>
      )}

      {/* Danh sách review */}
      <Text style={s.section}>Đánh giá của người dùng</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 12 }} />
      ) : reviews.length === 0 ? (
        <Text style={{ color: '#888' }}>Chưa có đánh giá nào</Text>
      ) : (
        reviews.map(r => (
          <View key={r.id} style={s.review}>
            <View style={s.reviewHead}>
              <Text style={s.userName}>{r.userName}</Text>
              <RatingStars value={r.rating} size={14} />
            </View>
            <Text>{r.comment}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  author: { color: '#666', marginBottom: 12 },
  summary: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  avg: { fontSize: 40, fontWeight: '700' },
  count: { color: '#666', marginTop: 2 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 12, minHeight: 70, textAlignVertical: 'top' },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  button: { backgroundColor: '#1e88e5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
  review: { borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10 },
  reviewHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  userName: { fontWeight: '600' },
});