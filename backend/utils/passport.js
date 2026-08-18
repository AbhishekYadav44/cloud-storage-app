import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Types } from "mongoose";

import User from "../models/userModel.js";
import Directory from "../models/directoryModel.js";

passport.use(
  
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account has no email"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
          const userId = new Types.ObjectId();
          const rootDirId = new Types.ObjectId();

          await Directory.create({
            _id: rootDirId,
            name: `root-${email}`,
            parentDirId: null,
            userId,
          });

          user = await User.create({
            _id: userId,
            name: profile.displayName,
            email,
            password: null,
            googleId: profile.id,
            picture: profile.photos?.[0]?.value || "",
            rootDirId,
            isGoogleUser: true,
          });
        } else {
          if (!user.googleId) {
            user.googleId = profile.id;
          }

          if (!user.picture && profile.photos?.length) {
            user.picture = profile.photos[0].value;
          }

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;