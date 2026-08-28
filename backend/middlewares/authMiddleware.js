import client from "../config/redis.js";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";

export default async function checkAuth(req, res, next) {
  const { sid } = req.signedCookies;

  if (!sid) {
    res.clearCookie("sid");
    return res.status(401).json({ error: "1 Not logged in!" });
  }

  const userId = await client.get(`session:${sid}`)
 

  if (!userId) {
    return res.status(401).json({
      error: "Session expired or invalid"
    });
  }

  const user = await User.findById(userId).lean();
  if (!user) {
    return res.status(401).json({ error: "3 Not logged in!" });
  }
  req.user = user;
  next();
}

export const checknotRegularUser = (req, res, next) => {

  if (req.user.role !== "user") return next();

  return res.json({
    message: "you can not access useres"
  })

}
