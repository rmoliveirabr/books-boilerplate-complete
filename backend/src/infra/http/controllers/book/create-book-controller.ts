import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
  } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

import { CreateBook } from '@/domain/book/usecases/create-book';
import { GetUser } from '@/domain/customer/usecases/get-user';
import { BookPresenter} from '@/infra/http/presenters/book-presenter'

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const createBookBodySchema = z.object({
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
});
  
type CreateBookBodySchema = z.infer<typeof createBookBodySchema>;

@Controller('/books')
export class CreateBookController {
    constructor(
        private readonly createBookUseCase: CreateBook,
    ) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createBookBodySchema))
    async handle(
        @Body() body: CreateBookBodySchema,
        @CurrentUser() user: UserPayload,
    ) {
        // set the creatorId to the logged user id
        const { sub, username } = user; // sub is the user id
        if (!sub) throw new BadRequestException(`User not found for username: ${username}`);

        // create the book
        const {
            title,
            author,
            summary = '',
            publisher = '',
            publicationDate,
        } = body;
        
        const response = await this.createBookUseCase.execute({
            title,
            author,
            summary,
            publisher,
            publicationDate,
            creatorId: sub,
        });
        const responseValue = response.getResponse();

        if (response.isError() || !responseValue) throw new BadRequestException(response.getError()?.message);
        else return { message: 'Book updated successfully', book: BookPresenter.toHttpResponse(responseValue.book) }; // TODO: locale
    }
}