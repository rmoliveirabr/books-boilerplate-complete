import { UseCaseError } from "@/core/errors/use-case-error";

export class NotAllowed extends Error implements UseCaseError {
  // TODO: use locale
  constructor() {
    super(`Not allowed`);
  }
}
