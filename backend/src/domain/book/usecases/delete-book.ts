import { Book } from '@/domain/book/entities/book';
import { BookRepository } from '@/domain/book/repositories/book-repository';
import { UseCaseResponse, Error, Response } from '@/core/use-case-response';
import { ResourceNotFound } from '@/core/errors/resource-not-found';

import { Injectable } from '@nestjs/common';

type BookResponse = UseCaseResponse<
    ResourceNotFound,
    {
        book: Book
    }
>;

@Injectable()
export class DeleteBook {
    constructor(private bookRepository: BookRepository) {}
  
    async execute(id: string): Promise<BookResponse> {
        // check for existing book
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook)
            return new Error(new ResourceNotFound('book'));
        
        const deletedBook = await this.bookRepository.delete(id);
        if (!deletedBook) return new Error(new ResourceNotFound('book'));
        else return new Response({ book:deletedBook });
    }
}
  