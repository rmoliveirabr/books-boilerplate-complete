import {
    BadRequestException,
    Controller,
    Get,
    Param,
  } from '@nestjs/common';

import { GetBook } from '@/domain/book/usecases/get-book';
import { BookPresenter} from '@/infra/http/presenters/book-presenter'
import { Public } from "@/infra/auth/public";

@Controller('/books')
@Public()
export class GetBookController {
    constructor(private readonly getBookUseCase: GetBook) {}

    @Get(':id')
    async handle(@Param('id') id: string) {
        const response = await this.getBookUseCase.execute(id);
        const responseValue = response.getResponse();

        if (response.isError() || !responseValue) throw new BadRequestException(response.getError()?.message);
        else return { book: BookPresenter.toHttpResponse(responseValue.book) };
    }
}