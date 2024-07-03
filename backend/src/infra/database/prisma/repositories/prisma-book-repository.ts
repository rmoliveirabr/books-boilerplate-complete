import { Pagination } from '@/core/pagination';
import { Book } from '@/domain/book/entities/book';
import { BookRepository } from '@/domain/book/repositories/book-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaBookMapper } from '@/infra/database/prisma/mappers/prisma-book-mapper';
import { Book as PrismaBook } from '@prisma/client';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBookRepository implements BookRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({
            where: {id}
        });

        if (!book) return null;

        return PrismaBookMapper.toDomain(book);
    }

    async delete(id: string): Promise<Book | null> {
        const book = await this.prisma.book.delete({
            where: {id}
        });

        return PrismaBookMapper.toDomain(book);
    }

    async update(id: string, book: Book): Promise<Book> {
        const findBook = await this.prisma.book.findUnique({
            where: {id},
        });

        const bookUpdatedData = { ...findBook };
        if (book.title) bookUpdatedData.title = book.title;
        if (book.author) bookUpdatedData.author = book.author;
        if (book.summary) bookUpdatedData.summary = book.summary;
        if (book.publisher) bookUpdatedData.publisher = book.publisher;
        if (book.publicationDate) bookUpdatedData.publicationDate = book.publicationDate;
        if (book.creatorId) bookUpdatedData.creatorId = book.creatorId;
        if (book.updatedAt) bookUpdatedData.updatedAt = book.updatedAt;

        const updatedBook = await this.prisma.book.update({
            where: {id},
            data: {
                ...bookUpdatedData
            },
        });

        return PrismaBookMapper.toDomain(updatedBook);
    }
    
    async getAll({
        page,
        pageSize,
        filters,
        sorting,
        }: Pagination): Promise<{ books: Book[], totalCount: number }> {

        const orderBy: any = {};
        if (sorting && sorting.column) {
            if (Array.isArray(sorting.column))
                for (const column of sorting.column)
                    orderBy[column] = sorting.asc ? 'asc' : 'desc';
        }

        const where: any = {};
        if (filters && filters.query && filters.query != '') {
            where.OR = [
                {title: {contains: filters.query}},
                {author: {contains: filters.query}},
                {summary: {contains: filters.query}},
                {publisher: {contains: filters.query}},
            ]
        }

        const skip = (page && pageSize) ? (page - 1) * pageSize : 0;

        // Parse pageSize as integer, default to 10 if nothing is passed
        const pageSizeInt = pageSize ? parseInt(pageSize as unknown as string, 10) : 10;
        
        // Query to get the total count of books
        const totalCount = await this.prisma.book.count({ where });

        // Query to get the paginated list of books
        const books = await this.prisma.book.findMany({
            where,
            orderBy,
            skip,
            take: pageSizeInt,
        });

        // console.log(`page: ${page}, pageSize: ${pageSize}, skip: ${skip}, pageSize: ${pageSizeInt}, books:`, books);

        return {
            books: books.map((book:PrismaBook) => PrismaBookMapper.toDomain(book)),
            totalCount,
        };
    }

    async findByTitle(title: string): Promise<Book | null> {
        const book = await this.prisma.book.findFirst({
            where: {
                title: title
            }
        });

        if (!book) return null;

        return PrismaBookMapper.toDomain(book);
    }

    async create(book: Book): Promise<Book> {
        const bookData = PrismaBookMapper.toPrisma(book);

        await this.prisma.book.create({
            data: {
                ...bookData
            },
        });
        
        return book;
    }
}