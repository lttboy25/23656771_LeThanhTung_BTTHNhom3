export type Review = {
  id: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
};

// Dữ liệu mẫu theo bookId (mất khi tắt app)
const db: Record<string, Review[]> = {
  '1': [
    { id: 'r1', userName: 'Minh', rating: 5, comment: 'Sách rất hay, nội dung dễ hiểu.' },
    { id: 'r2', userName: 'Lan', rating: 4, comment: 'Giao hàng nhanh, sách mới.' },
    { id: 'r3', userName: 'Huy', rating: 3, comment: 'Tạm ổn, hơi dài dòng.' },
  ],
};

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

export const calcAverage = (reviews: Review[]) =>
  reviews.length
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

export const reviewService = {
  async getReviews(bookId: string): Promise<Review[]> {
    await delay();
    return [...(db[bookId] ?? [])];
  },

  // Giả lập POST /books/:id/reviews
  async postReview(
    bookId: string,
    data: { userName: string; rating: number; comment: string }
  ): Promise<Review> {
    await delay();
    const review: Review = { id: `r${Date.now()}`, ...data };
    db[bookId] = [review, ...(db[bookId] ?? [])];
    return review;
  },
};