import { HashCompare } from "@/domain/customer/hash/hash-compare";
import { HashGenerator } from "@/domain/customer/hash/hash-generator";
import { hash, compare } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8;

  generator(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
