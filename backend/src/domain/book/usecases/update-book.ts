import { BookRepository } from '@/domain/book/repositories/book-repository';
import { Book } from '@/domain/book/entities/book';
import { User } from '@/domain/customer/entities/user';
import { UseCaseResponse, Error, Response } from '@/core/use-case-response';
import { ResourceNotFound } from '@/core/errors/resource-not-found';

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
    ResourceNotFound,
    {
        book: Book;
    }
>;

@Injectable()
export class UpdateBook {
    constructor(private bookRepository: BookRepository) {}
  
    async execute(id: string, book:BookRequest): Promise<BookResponse>  {
        // check for existing book
        const existingBook = await this.bookRepository.findById(id);

        if (existingBook) {
            // don't update the creator, get from the created book
            const updatedBook = Book.create(book);
            updatedBook.creatorId = existingBook.creatorId;

            await this.bookRepository.update(id, updatedBook);
            return new Response({ book:updatedBook });
        } 

        return new Error(new ResourceNotFound('book'));        
    }
}
  