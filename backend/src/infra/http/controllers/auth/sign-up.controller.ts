import { Public } from "@/infra/auth/public";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UsePipes,
} from "@nestjs/common";
import { z } from "zod";

import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

import { UserAlreadyExists } from "@/domain/customer/usecases/errors/user-already-exists";
import { ResourceNotFound } from "@/core/errors/resource-not-found";

// import { SendMailUseCase } from "@/domain/customer/application/use-cases/send-mail";
import { SignUp } from "@/domain/customer/usecases/sign-up";

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
});

type SignUpBodySchema = z.infer<typeof signUpBodySchema>;

@Controller("/signup")
@Public()
export class SignUpController {
  constructor(private signUpUseCase: SignUp) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(signUpBodySchema))
  async handle(@Body() body: SignUpBodySchema) {
    const { name, email, password, phone } = body;

    const signUp = await this.signUpUseCase.execute({
      name,
      username: email,
      password,
      phone,
    });

    if (signUp.isError()) {
      const error = signUp.getError();

      switch (error?.constructor) {
        case UserAlreadyExists:
          throw new ConflictException(error.message);
        case ResourceNotFound:
          throw new NotFoundException("Team or role not found"); // TODO: add locale
        default:
          throw new BadRequestException(error?.message);
      }
    }

    // const { user } = signUp.getResponse();

    return signUp.getResponse();
  }
}
