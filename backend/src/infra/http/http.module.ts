import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { HasherModule } from "@/infra/hasher/hasher.module";

import { CreateBookController } from '@/infra/http/controllers/book/create-book-controller';
import { CreateBook } from '@/domain/book/usecases/create-book';
import { GetUser } from '@/domain/customer/usecases/get-user';

import { UpdateBookController } from '@/infra/http/controllers/book/update-book-controller';
import { UpdateBook } from '@/domain/book/usecases/update-book';

import { GetAllBooksController } from '@/infra/http/controllers/book/get-all-books-controller';
import { GetAllBooks } from '@/domain/book/usecases/get-all-books';

import { GetBookController } from '@/infra/http/controllers/book/get-book-controller';
import { GetBook } from '@/domain/book/usecases/get-book';

import { DeleteBookController } from '@/infra/http/controllers/book/delete-book-controller';
import { DeleteBook } from '@/domain/book/usecases/delete-book';

import { SignInController } from '@/infra/http/controllers/auth/sign-in.controller';
import { SignIn } from '@/domain/customer/usecases/sign-in';

import { SignUpController } from '@/infra/http/controllers/auth/sign-up.controller';
import { SignUp } from '@/domain/customer/usecases/sign-up';

@Module({
    imports: [DatabaseModule, HasherModule],
    controllers: [
        CreateBookController,
        UpdateBookController,
        GetAllBooksController,
        GetBookController,
        DeleteBookController,
        SignInController,
        SignUpController,
    ],
    providers: [
        CreateBook,
        UpdateBook,
        GetAllBooks,
        GetBook,
        DeleteBook,
        SignIn,
        SignUp,
        GetUser,
    ],
})

export class HttpModule {}