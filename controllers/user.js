import { UserModel } from "../models/users.js";

export const usermount = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await UserModel.findAll({
        where: {
          user_ID: req.user[0].user_ID,
        },
      });
      console.log("user", user);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.params.userId;
    const user = UserModel.findOne({ where: { user_ID: userId } });
    await UserModel.update(
      {
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        contactNum: req.body.phoneNumber || user.contactNum,
      },
      { where: { user_ID: userId } }
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userlogout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
};
