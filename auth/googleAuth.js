import passport from "passport";
import GoogleAuth from "passport-google-oauth20";
import { UserModel } from "../models/users.js";

const GoogleStrategy = GoogleAuth.Strategy;

export function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log("profile", profile);
        try {
          let user = await UserModel.findAll({
            where: {
              user_ID: profile.id,
            },
          });

          if (user.length == 0) {
            user = await UserModel.create({
              user_ID: profile.id,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
              contactNum: null,
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
