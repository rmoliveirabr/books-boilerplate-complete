import { BookRepository } from '@/domain/book/repositories/book-repository';
import { Book } from '@/domain/book/entities/book';
import { User } from '@/domain/customer/entities/user';
import { ResourceDuplicatedByFieldError } from '@/core/errors/resource-duplicated-by-field';
import { UseCaseResponse, Error, Response } from '@/core/use-case-response';

import { Injectable } from '@nestjs/common';

type BookRequest = {
  title: string
  author: string;
  summary?: string;
  publisher?: string;
  publicationDate: Date;  
  creatorId: string;
}

type BookResponse = UseCaseResponse<
    ResourceDuplicatedByFieldError,
    {
      book: Book;
    }
>;

@Injectable()
export class CreateBook {
    constructor(private readonly bookRepository: BookRepository) {}
  
    async execute(book: BookRequest): Promise<BookResponse> {
        // check for existing book
        const existingBook = await this.bookRepository.findByTitle(book.title);
        if (existingBook)
          return new Error(new ResourceDuplicatedByFieldError('book', 'title', book.title));

        // add book
        const addedBook = await this.bookRepository.create(Book.create(book));
        return new Response({ book:addedBook });
    }
}
  