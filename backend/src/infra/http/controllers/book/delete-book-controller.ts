import {
    BadRequestException,
    Controller,
    Delete,
    Param,
  } from '@nestjs/common';

import { DeleteBook } from '@/domain/book/usecases/delete-book';
import { BookPresenter} from '@/infra/http/presenters/book-presenter'

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

@Controller('/books')
export class DeleteBookController {
    constructor(private readonly deleteBookUseCase: DeleteBook) {}

    @Delete(':id')
    async handle(
        @Param('id') id: string,
        @CurrentUser() user: UserPayload,
    ) {
        const response = await this.deleteBookUseCase.execute(id);
        const responseValue = response.getResponse();

        if (response.isError() || !responseValue) throw new BadRequestException(response.getError()?.message);
        else return { message: 'Book deleted successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale
    }
}