import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prismaClient.js";

export function initPassport() {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, name: true },
          });

          if (!user) return done(null, false);
          return done(null, user); // -> becomes req.user
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}
