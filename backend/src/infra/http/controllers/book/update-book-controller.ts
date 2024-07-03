import {
    BadRequestException,
    Body,
    Param,
    Controller,
    HttpCode,
    Put,
    UsePipes,
  } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { UpdateBook } from '@/domain/book/usecases/update-book';
import { BookPresenter} from '@/infra/http/presenters/book-presenter'

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const updateBookBodySchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    summary: z.string().optional(),
    publisher: z.string().optional(),
    publicationDate: z.string()
        .refine((val) => {   // receives a string, validate as a date, return as a date
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, {
            message: "Invalid date format", // TODO: locale
        }).transform((val) => new Date(val)),
    creatorId: z.string().optional(),
});
  
type UpdateBookBodySchema = z.infer<typeof updateBookBodySchema>;

@Controller('/books')
export class UpdateBookController {
    constructor(private readonly updateBookUseCase: UpdateBook) {}

    @Put(':id')
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(updateBookBodySchema))
    async handle(
        @Param('id') id: string,
        @Body() body: UpdateBookBodySchema,
        @CurrentUser() user: UserPayload,
    ) {
        const {
            title,
            author,
            summary = '',
            publisher = '',
            publicationDate,
            creatorId,
        } = body;

        const response = await this.updateBookUseCase.execute(id, {
            title,
            author,
            summary,
            publisher,
            publicationDate,
            creatorId: creatorId || '', // it's acceptable not to pass the creatorId because it will not use it (it will keep the creator from the existing book)
        });
        const responseValue = response.getResponse();

        if (response.isError() || !responseValue) throw new BadRequestException(response.getError()?.message);
        else return { message: 'Book updated successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale
    }
}