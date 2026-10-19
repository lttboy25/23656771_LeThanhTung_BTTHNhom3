const BASE_URL = 'https://6aba13785b549d818d61e2cc.mockapi.io/api/v1/books';

export type Review = {
  id: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
};

type Book = {
  id: string;
  title: string;
  author: string;
  years: number;
  genre: string;
  reviews: Review[];
};

export const calcAverage = (reviews: Review[]) =>
  reviews.length
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

const fetchBook = async (bookId: string): Promise<Book> => {
  const res = await fetch(`${BASE_URL}/${bookId}`);
  if (res.status === 404) throw new Error('Khong tim thay sach');
  if (!res.ok) throw new Error('Khong ket noi duoc may chu');
  const book: Book = await res.json();
  return { ...book, reviews: Array.isArray(book.reviews) ? book.reviews : [] };
};

export const reviewService = {
  // GET /books/:id  ->  book.reviews
  async getReviews(bookId: string): Promise<Review[]> {
    const book = await fetchBook(bookId);
    return book.reviews;
  },

  // GET /books/:id  ->  thêm review  ->  PUT /books/:id
  async postReview(
    bookId: string,
    data: { userName: string; rating: number; comment: string }
  ): Promise<Review> {
    // Lấy bản mới nhất ngay trước khi ghi, tránh đè mất review người khác vừa gửi
    const book = await fetchBook(bookId);

    const review: Review = { id: `r${bookId}-${Date.now()}`, ...data };
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...book, reviews: [review, ...book.reviews] }),
    });
    if (!res.ok) throw new Error('Gui danh gia that bai');

    return review;
  },
};