import { UseCaseResponse, Error, Response } from '@/core/use-case-response';
import { ResourceNotFound } from '@/core/errors/resource-not-found';
import { UserAlreadyExists } from "@/domain/customer/usecases/errors/user-already-exists";

import { UserRepository } from "@/domain/customer/repositories/user-repository";
import { User } from "@/domain/customer/entities/user";
import { HashGenerator } from "@/domain/customer/hash/hash-generator";

import { Injectable } from "@nestjs/common";

type SignUpRequest = {
  username: string;
  password: string;
  name?: string;
  phone?: string;
};

type SignUpResponse = UseCaseResponse<
  UserAlreadyExists | ResourceNotFound,
  {
    user: User;
  }
>;

@Injectable()
export class SignUp {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    username,
    password,
    phone,
  }: SignUpRequest): Promise<SignUpResponse> {

      const userExists = await this.userRepository.findByUsername(username);

      if (userExists) {
        return new Error(new UserAlreadyExists(username));
      }

      const hashPassword = await this.hashGenerator.generator(password);

      const user = User.create({
        username,
        name,
        phone,
        password: hashPassword,
        active: true,
      });

      await this.userRepository.create(user);

      return new Response({ user });
    }
}
