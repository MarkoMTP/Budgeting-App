import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prismaClient.js";
import type { JwtPayload } from "../types/userTypes.js";

export function initPassport() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not set");
  }

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
      },
      async (payload: JwtPayload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, name: true },
          });

          if (!user) return done(null, false);
          return done(null, user); // -> becomes req.user
        } catch (err) {
          if (err instanceof Error) {
            return done(err, false);
          }
          console.error(err);
          return done(new Error("Unknown authentication error"), false);
        }
      },
    ),
  );
}
