const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const passwordValidator = require("../middleware/passwordValidator");
const signUpLimiter = require("../middleware/Limiters");
const emailRegEx = require("../middleware/emailRegEx");
const usernameRegEx = require("../middleware/usernameRegEx");

//route post : signup
router.post(
  "/signup",
  signUpLimiter,
  usernameRegEx,
  emailRegEx,
  passwordValidator,
  userCtrl.signup
);

//route post : login
router.post("/login", usernameRegEx, emailRegEx, userCtrl.login);

//route get : userProfil
router.get("/userProfil", auth, userCtrl.userProfil);

//route put : modifyUserProfil
router.put("/modifyUserProfil", auth, usernameRegEx, userCtrl.modifyUserProfil);

//route delete : deleteUserProfil
router.delete("/deleteUser", auth, userCtrl.deleteUser);

module.exports = router;
