import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { BookRepository } from '@/domain/book/repositories/book-repository'
import { PrismaBookRepository } from '@/infra/database/prisma/repositories/prisma-book-repository'

import { UserRepository } from '@/domain/customer/repositories/user-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'

@Module({
    providers: [
      PrismaService,
      {
        provide: BookRepository,
        useClass: PrismaBookRepository,
      },
      {
        provide: UserRepository,
        useClass: PrismaUserRepository,
      },
    ],
    exports: [
      PrismaService,
      BookRepository,
      UserRepository,
    ],
  })
  export class DatabaseModule {}  

