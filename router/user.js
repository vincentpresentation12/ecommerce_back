const express = require("express");
const {
  getAllUser,
  addUser,
  connectUser,
  Me,
  logout,
  updateProfil,
  updatePassword,
} = require("../controller/user");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

const userRouter = express.Router();

userRouter.get("/", auth, getAllUser);
userRouter.put("/", auth, updateProfil);
userRouter.put("/password", auth, updatePassword);
userRouter.post("/", addUser);
userRouter.get("/me", verifyToken, Me);
userRouter.post("/connect", connectUser);
userRouter.post("/logout", auth, logout);

module.exports = userRouter;
