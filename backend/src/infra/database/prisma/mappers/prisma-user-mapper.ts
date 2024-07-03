import { User } from '@/domain/customer/entities/user';
import { User as PrismaUser, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class PrismaUserMapper {

  static toDomain(userData: PrismaUser): User {
    return User.create(
      {
        username: userData.username,
        password: userData.password,
        name: userData.name ?? null,
        phone: userData.phone ?? null,
        resetPasswordToken: userData.resetPasswordToken ?? null,
        confirmedEmail: userData.confirmedEmail ?? false,
        active: userData.active,
        deletedAt: userData.deletedAt ?? null,
      },
      userData.id ?? randomUUID(),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      username: user.username,
      password: user.password,
      name: user.name,
      phone: user.phone,
      resetPasswordToken: user.resetPasswordToken,
      confirmedEmail: user.confirmedEmail,
      active: user.active,
      deletedAt: user.deletedAt,
    };
  }
}