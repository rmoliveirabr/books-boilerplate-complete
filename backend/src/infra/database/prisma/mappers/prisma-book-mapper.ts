import { Book } from '@/domain/book/entities/book';
import { Book as PrismaBook, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class PrismaBookMapper {

    static toDomain(bookData:PrismaBook): Book {
      return Book.create(
          {
            title: bookData.title,
            author: bookData.author || '',
            summary: bookData.summary || '',
            publisher: bookData.publisher,
            publicationDate: bookData.publicationDate,
            creatorId: bookData.creatorId,
          },
          bookData.id ?? randomUUID(),
        );
    }  

    static toPrisma(book:Book): Prisma.BookUncheckedCreateInput {
        return {
          id: book.id.toString(),
          title: book.title,
          author: book.author,
          summary: book.summary,
          publisher: book.publisher,
          publicationDate: book.publicationDate,
          creatorId: book.creatorId,
        };
    }
}