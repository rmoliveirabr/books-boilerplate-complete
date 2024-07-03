import {
    BadRequestException,
    Query,
    Controller,
    Get,
    UsePipes,
  } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { GetAllBooks } from '@/domain/book/usecases/get-all-books';
import { BookPresenter} from '@/infra/http/presenters/book-presenter'
import { Public } from "@/infra/auth/public";

const getAllBooksBodySchema = z.object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
    query: z.string().optional(),
    asc: z.string().optional(),
    desc: z.string().optional(),
});
  
type GetAllBooksBodySchema = z.infer<typeof getAllBooksBodySchema>;

@Controller('/books')
@Public()
export class GetAllBooksController {
    constructor(private readonly getAllBooksUseCase: GetAllBooks) {}

    @Get()
    @UsePipes(new ZodValidationPipe(getAllBooksBodySchema))
    async handle(@Query() URLQuery: GetAllBooksBodySchema) {
        const { page, pageSize, asc, desc, query } = URLQuery;
        const response = await this.getAllBooksUseCase.execute({
            pagination: {
              page,
              pageSize,
              filters: { query },
              sorting: { asc: asc ? true : desc ? true : false, column: asc },
            },
        });

        const bookList = response.getResponse()?.books.map((book) =>
            BookPresenter.toHttpResponse(book));
        const totalCount = response.getResponse()?.totalCount;

        return {
            books: bookList,
            totalCount,
        };
    }
}