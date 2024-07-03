import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
// import { EnvService } from "../env/env.service";
// import { EnvModule } from "../env/env.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // imports: [EnvModule],
      // inject: [EnvService],
      global: true,
      // useFactory(env: EnvService) {
      useFactory() {
        const privateKey = `${process.env.JWT_PRIVATE_KEY_API}`; // later env.get("JWT_PRIVATE_KEY_API");
        const publicKey = `${process.env.JWT_PUBLIC_KEY_API}`; // later env.get("JWT_PUBLIC_KEY_API");

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(
            privateKey,
            "base64",
          ),
          publicKey: Buffer.from(
            publicKey,
            "base64",
          ),
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    // EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}