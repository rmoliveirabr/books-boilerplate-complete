import { Public } from "@/infra/auth/public";
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

import { WrongCredentials } from "@/domain/customer/usecases/errors/wrong-credentials";

import { SignIn } from "@/domain/customer/usecases/sign-in";

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInBodySchema = z.infer<typeof signInBodySchema>;

@Controller("/signin")
@Public()
export class SignInController {
  constructor(private readonly signInUseCase: SignIn) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(signInBodySchema))
  async handler(@Body() body: SignInBodySchema) {
    const { email, password } = body;

    const response = await this.signInUseCase.execute({
      username: email,
      password,
    });

    if (response.isError()) {
      const error = response.getError();

      console.log(error);

      switch (error?.constructor) {
        case WrongCredentials:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error?.message);
      }
    }

    const accessToken = response.getResponse()?.accessToken; 

    return {
      access_token: accessToken,
      email,
    };
  }
}
