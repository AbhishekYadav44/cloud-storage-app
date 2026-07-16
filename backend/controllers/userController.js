import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";
import Otp from "../models/otpModel.js";

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

    session.startTransaction();

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

    session.commitTransaction();

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    session.abortTransaction();
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

  const session = await Session.create({ userId: user._id });

  res.cookie("sid", session.id, {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: "logged in" });
};
export const getAllUsers = async (req, res) => {
  const allUsers = await User.find({deleted : false}).lean();
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

export const logoutById = async (req, res) => {
  try {

    const sessions = await Session.deleteMany({ userId: req.params.userId })
    res.status(204).json({
      message: "user logged out!"
    })
  } catch (e) {
    return res.json({

      message: "err while loggin out",
      e
    })
  }
}



export const logout = async (req, res) => {

  const { sid } = req.signedCookies;
  await Session.findByIdAndDelete(sid)

  res.clearCookie("sid");
  res.status(200).json({
    message: "user logged out!"
  }).end();
};

export const logoutAll = async (req, res) => {
  const { sid } = req.signedCookies;
  const session = await Session.findById(sid);
  console.log("session ,", session)

  const deletedUSer = await Session.deleteMany({ userId: session.userId })
  console.log(deletedUSer)

  res.clearCookie("sid");
  res.status(204).end();
}

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (req.user._id.toString() === userId) {
      return res.status(403).json({ error: "You can not delete yourself." });
    }

    await User.findByIdAndUpdate(userId, { deleted: true })

    return res.status(204).json({
      message: "user deleted succesfully!"
    })

  } catch (err) {
    err
    return res.json({ message: "user not deleted!" })
  }
}

export const deleteUserhard = async (req, res) => {
  try {

    const userId = req.params.userId;
    const user = await User.findById({ userId })
      if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

     
    if (user.deleted === true) {

      await User.findByIdAndDelete({ userId })
      await File.findByIdAndDelete({ userId })
      await Directory.findByIdAndDelete({ userId })
      await Session.findByIdAndDelete({ userId })
    }

    return res.json({
      message : "user permanentely deleted!"
    })

  } catch (err) {
    return res.json({
      err,
      message: "err while deleting user!"
    })
  }
}
