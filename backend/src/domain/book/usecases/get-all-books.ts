import { BookRepository } from '@/domain/book/repositories/book-repository';
import { Book } from '@/domain/book/entities/book';
import { UseCaseResponse, Response } from '@/core/use-case-response';
import { Pagination } from '@/core/pagination';

import { Injectable } from '@nestjs/common';

type BookRequest = {
    pagination: Pagination;
};

type BookResponse = UseCaseResponse<
    null,
    {
      books: Book[];
      totalCount: number;
    }
>;

@Injectable()
export class GetAllBooks {
    constructor(private bookRepository: BookRepository) {}
  
    async execute({pagination}: BookRequest): Promise<BookResponse> {  
        var response = await this.bookRepository.getAll(pagination);
        
        return new Response(response);
    }
}
  