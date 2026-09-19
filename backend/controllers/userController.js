import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";
import Otp from "../models/otpModel.js";
import { createSession } from "../utils/session.js";
import client from "../config/redis.js";

export const register = async (req, res, next) => {
  console.log("req fro frontend")
  const { name, email, password, otp } = req.body;
  const session = await mongoose.startSession();
  const hashedPassword = await bcrypt.hash(password, 12);

  const verifyotp = await Otp.findOne({ email, otp });

  if (!verifyotp) {
    return res.json({ message: "invalid or expired otp" })
  }

  try {
    const rootDirId = new Types.ObjectId();
    const userId = new Types.ObjectId();

    await session.startTransaction();

    await Directory.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
      { session }
    );

    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        password: hashedPassword,
        rootDirId,
      },
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
    if (err.code === 121) {
      res
        .status(400)
        .json({ error: "Invalid input, please enter valid details" });
    } else if (err.code === 11000) {
      if (err.keyValue.email) {
        return res.status(409).json({
          error: "This email already exists",
          message:
            "A user with this email address already exists. Please try logging in or use a different email.",
        });
      }
    } else {
      next(err);
    }
  } finally {
    await session.endSession();
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }

  const allsessions = await Session.find({ userId: user.id })
  if (allsessions.length >= 2) {

    await allsessions[0].deleteOne()

  }

  const sessionId = await createSession(user._id);

  res.cookie("sid", sessionId, {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: "logged in" });
};
export const getAllUsers = async (req, res) => {
  const allUsers = await User.find({ deleted: false }).lean();
  const allSessions = await Session.find().lean();
  const allSessionsUserId = allSessions.map(({ userId }) => userId.toString());
  const allSessionsUserIdSet = new Set(allSessionsUserId);

  const transformedUsers = allUsers.map(({ _id, name, email }) => ({
    id: _id,
    name,
    email,
    isLoggedIn: allSessionsUserIdSet.has(_id.toString()),
  }));
  res.status(200).json(transformedUsers);
};

export const getDeletedUsers = async (req, res, next) => {
  try {
    const users = await User.find({ deleted: true }).lean();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture,
    role: req.user.role
  });
};

export const logoutById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const sessionIds = await client.sMembers(
      `user:sessions:${userId}`
    );

    if (sessionIds.length > 0) {
      await client.del(
        sessionIds.map((id) => `session:${id}`)
      );
    }

    await client.del(`user:sessions:${userId}`);

    return res.status(200).json({
      message: "user logged out!"
    });

  } catch (err) {
    next(err);
  }

}



export const logout = async (req, res) => {

  const { sid } = req.signedCookies;
  if (!sid) {
    return res.status(401).json({
      message: "Not logged in"
    });
  }
  const userId = await client.get(`session:${sid}`);

  if (userId) {
    await client.del(`session:${sid}`);

    await client.sRem(
      `user:sessions:${userId}`,
      sid
    );
  }

  res.clearCookie("sid");
  res.status(200).json({
    message: "user logged out!"
  }).end();
};

export const logoutAll = async (req, res) => {
  const { sid } = req.signedCookies;

  const userId = await client.get(`session:${sid}`)


  if (!userId) {
    return res.status(401).json({
      message: "Session expired"
    });
  }

  const sessionIds = await client.sMembers(`user:sessions:${userId}`)  // user:sessions:100 → { ABC, XYZ }  here sessionIds = [abc,scy]

  await client.del(
    sessionIds.map((id) => `session:${id}`)
  );

  await client.del(`user:sessions:${userId}`);
  res.clearCookie("sid");
  res.status(204).end();
}

export const deleteUser = async (req, res) => {
  console.log("reached!")
  const userId = req.params.userId;
  console.log(userId)
  try {
    if (req.user._id.toString() === userId) {
      return res.status(403).json({ error: "You can not delete yourself." });
    }

    await User.findByIdAndUpdate(userId, { deleted: true })

    return res.status(204).json({
      message: "user deleted succesfully!"
    })

  } catch (err) {
    console.log(err)
    return res.json({ message: "user not deleted!" })
  }
}

export const deleteUserhard = async (req, res) => {
  try {

    const userId = req.params.userId;
    console.log(userId)
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }


    if (user.deleted === true) {

      await User.findByIdAndDelete(userId )
      await File.deleteMany({ userId })
      await Directory.deleteMany({ userId })
      await Session.deleteMany({ userId })
    }

    return res.json({
      message: "user permanentely deleted!"
    })

  } catch (err) {
    return res.json({
      err,
      message: "err while deleting user!"
    })
  }
}


export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const sessionId = await createSession(user._id);

    res.cookie("sid", sessionId, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(`${process.env.CLIENT_URL}/drive`);
  } catch (error) {
    console.error(error);
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};
