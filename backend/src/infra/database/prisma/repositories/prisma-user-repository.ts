import { UserRepository } from '@/domain/customer/repositories/user-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper';
import { User as PrismaUser } from '@prisma/client'; 

import { Injectable } from '@nestjs/common';
import { User } from '@/domain/customer/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {id},
        });

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        
        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }

    async findByResetToken(token: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
            },
        });

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }    

    async create(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);

        const createdUser = await this.prisma.user.create({
            data: {
              ...userData,
            },
        });

        return PrismaUserMapper.toDomain(createdUser);
    }

    async save(user: User): Promise<User> {
        const userData = PrismaUserMapper.toPrisma(user);

        const updatedUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
              ...userData,
            },
        });

        return PrismaUserMapper.toDomain(updatedUser);
    }
}
