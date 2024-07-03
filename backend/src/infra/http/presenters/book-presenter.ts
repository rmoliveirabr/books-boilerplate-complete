import { Book } from '@/domain/book/entities/book';

export class BookPresenter {
    static toHttpResponse(book:Book) {
        return {
          id: book.id.toString(),
          title: book.title,
          author: book.author,
          summary: book.summary,
          publisher: book.publisher,
          publicationDate: book.publicationDate,
          creatorId: book.creatorId.toString(),
        };
    }
}