import { UserRepository } from '@/domain/customer/repositories/user-repository';
import { User } from '@/domain/customer/entities/user';
import { ResourceNotFound } from '@/core/errors/resource-not-found'
import { UseCaseResponse, Error, Response } from '@/core/use-case-response';

import { Injectable } from '@nestjs/common';

type UserResponse = UseCaseResponse<
    ResourceNotFound,
    {
      user: User;
    }
>;

@Injectable()
export class GetUser {
    constructor(private userRepository: UserRepository) {}
  
    async execute(username: string): Promise<UserResponse> {
        var user = await this.userRepository.findByUsername(username);
        if (user) return new Response({ user:user });
        else return new Error(new ResourceNotFound('user'));
    }
}
  