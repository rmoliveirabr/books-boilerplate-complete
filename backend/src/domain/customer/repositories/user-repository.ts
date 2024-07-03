import { User } from "@/domain/customer/entities/user";

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract save(user: User): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByResetToken(token: string): Promise<User | null>;
  // abstract count(): Promise<number>;
}
