import { api } from '../api/client';
import { Book } from '../types';

async function getAll(): Promise<Book[]> {
  const res = await api.get<Book[]>('/books');
  return res.data;
}

async function getPage(page: number, limit = 6): Promise<Book[]> {
  const res = await api.get<Book[]>('/books', { params: { _page: page, _limit: limit } });
  return res.data;
}

async function getById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}

async function getRelated(book: Book, limit = 10): Promise<Book[]> {
  const res = await api.get<Book[]>('/books', {
    params: { category: book.category, id_ne: book.id, _limit: limit },
  });
  return res.data;
}

export default { getAll, getPage, getById, getRelated };
