import { UseCaseError } from "@/core/errors/use-case-error";

export class UserAlreadyExists extends Error implements UseCaseError {
  // TODO: use locale
  constructor(username: string) {
    super(`User ${username} already exists`);
  }
}
