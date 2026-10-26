import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import RatingStars from '../components/RatingStars';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';
import RelatedBooks from '../components/RelatedBooks';
import PrimaryButton from '../components/PrimaryButton';
import bookService from '../services/bookService';
import reviewService from '../services/reviewService';
import { ScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart } from '../store/cartSlice';
import { logout } from '../store/authSlice';
import { Book, Review } from '../types';
import { averageRating } from '../utils/rating';

export default function BookDetailScreen({ navigation, route }: ScreenProps<'BookDetail'>) {
  const { bookId } = route.params;
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [b, r] = await Promise.all([
          bookService.getById(bookId),
          reviewService.getByBook(bookId),
        ]);
        if (cancelled) return;
        setBook(b);
        setReviews(r);
        bookService
          .getRelated(b)
          .then((list) => !cancelled && setRelated(list))
          .catch(() => {});
      } catch {
        if (!cancelled) setError('Không tải được thông tin sách');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookId]);

  const avg = useMemo(() => averageRating(reviews), [reviews]);

  const handleSubmitReview = useCallback(
    async (rating: number, comment: string) => {
      if (!user) return;
      let created: Review;
      try {
        created = await reviewService.create({
          bookId,
          userId: user.id,
          userName: user.name,
          rating,
          comment,
        });
      } catch (err: any) {
        if (err?.response?.status === 401) dispatch(logout());
        throw err;
      }
      setReviews((prev) => [created, ...prev]);
    },
    [bookId, user, dispatch]
  );

  const handleDeleteReview = useCallback(
    async (id: number) => {
      try {
        await reviewService.remove(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 401) dispatch(logout());
        Alert.alert(
          'Lỗi',
          status === 403
            ? 'Bạn chỉ xoá được đánh giá của mình'
            : status === 401
            ? 'Phiên đăng nhập đã hết hạn'
            : 'Không xoá được đánh giá'
        );
      }
    },
    [dispatch]
  );

  const confirmDelete = (id: number) =>
    Alert.alert('Xoá đánh giá', 'Bạn chắc chắn muốn xoá?', [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Xoá', style: 'destructive', onPress: () => handleDeleteReview(id) },
    ]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (error || !book) return <Text style={styles.center}>{error ?? 'Không tìm thấy sách'}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.top}>
        <Image source={{ uri: book.image }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.category}>{book.category}</Text>
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
          <PrimaryButton title="Thêm vào giỏ" onPress={() => dispatch(addToCart(book))} />
        </View>
      </View>

      <Text style={styles.desc}>{book.description}</Text>

      <Text style={styles.sectionTitle}>Đánh giá</Text>
      <View style={styles.avgRow}>
        <Text style={styles.avgNumber}>{avg.toFixed(1)}</Text>
        <View>
          <RatingStars value={avg} size={22} />
          <Text style={styles.count}>{reviews.length} đánh giá</Text>
        </View>
      </View>

      {user ? (
        <ReviewForm onSubmit={handleSubmitReview} />
      ) : (
        <PrimaryButton
          variant="outline"
          title="Đăng nhập để viết đánh giá"
          onPress={() => navigation.navigate('Login', { redirect: 'goBack' })}
        />
      )}

      {reviews.length === 0 ? (
        <Text style={styles.empty}>Chưa có đánh giá nào. Hãy là người đầu tiên!</Text>
      ) : (
        reviews.map((r) => (
          <ReviewItem
            key={r.id}
            review={r}
            canDelete={!!user && r.userId === user.id}
            onDelete={() => confirmDelete(r.id)}
          />
        ))
      )}

      <RelatedBooks
        books={related}
        onPressBook={(id) => navigation.push('BookDetail', { bookId: id })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, textAlign: 'center', marginTop: 40 },
  top: { flexDirection: 'row', gap: 14 },
  cover: { width: 120, height: 180, borderRadius: 8, backgroundColor: '#eee' },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 20, fontWeight: '700' },
  author: { color: '#555' },
  category: { color: '#1565c0' },
  price: { fontSize: 18, color: '#c62828', fontWeight: '700', marginBottom: 8 },
  desc: { marginTop: 16, lineHeight: 21, color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 8 },
  avgRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avgNumber: { fontSize: 40, fontWeight: '800' },
  count: { color: '#666', marginTop: 2 },
  empty: { color: '#888', marginTop: 12, fontStyle: 'italic' },
});
