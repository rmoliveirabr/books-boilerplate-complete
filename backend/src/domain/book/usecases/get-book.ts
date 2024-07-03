import { BookRepository } from '@/domain/book/repositories/book-repository';
import { Book } from '@/domain/book/entities/book';
import { ResourceNotFound } from '@/core/errors/resource-not-found'
import { UseCaseResponse, Error, Response } from '@/core/use-case-response';

import { Injectable } from '@nestjs/common';

type BookResponse = UseCaseResponse<
    ResourceNotFound,
    {
        book: Book;
    }
>;

@Injectable()
export class GetBook {
    constructor(private bookRepository: BookRepository) {}
  
    async execute(id: string): Promise<BookResponse> {
        var book = await this.bookRepository.findById(id);
        if (book) return new Response({ book:book });
        else return new Error(new ResourceNotFound('book'));
    }
}
  