import { Book } from '@/domain/book/entities/book';
import { Pagination } from '@/core/pagination';

export abstract class BookRepository {
  abstract getAll(filters: Pagination): Promise<{ books: Book[], totalCount: number }>;
  abstract findById(id: string): Promise<Book | null>;
  abstract findByTitle(title: string): Promise<Book | null>;
  abstract create(book: Book): Promise<Book>;
  abstract update(id:string, book: Book): Promise<Book>;
  abstract delete(id: string): Promise<Book | null>;
}
