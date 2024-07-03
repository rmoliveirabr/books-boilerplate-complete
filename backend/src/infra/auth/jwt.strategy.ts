import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
// import { EnvService } from "../env/env.service";

// the payload is returned in the signin usecase
const tokenPayloadSchema = z.object({
  sub: z.string().min(2),
  username: z.string(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(config: EnvService) {
  constructor() {
    const publicKey = `${process.env.JWT_PUBLIC_KEY_API}`; // later config.get("JWT_PUBLIC_KEY_BEEF_ADM_API");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(
        publicKey,
        "base64",
      ),
      algorithms: ["RS256"],
    });
  }

  // should return an object representing the authenticated user
  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
