import { Module } from "@nestjs/common";

import { HashEncrypt } from "@/domain/customer/hash/hash-encrypt";
import { HashCompare } from "@/domain/customer/hash/hash-compare";
import { HashGenerator } from "@/domain/customer/hash/hash-generator";

import { JwtEncrypter } from "@/infra/hasher/jwt-encrypter";
import { BcryptHasher } from "@/infra/hasher/bcrypt-hash";

@Module({
  providers: [
    { provide: HashEncrypt, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashEncrypt, HashCompare, HashGenerator],
})
export class HasherModule {}
