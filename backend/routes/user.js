const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

//route post : signup
router.post("/signup", userCtrl.signup);

//route post : login
router.post("/login", userCtrl.login);

//route get : userProfil
router.get("/userProfil", auth, userCtrl.userProfil);

//route put : modifyUserProfil
router.put("/modifyUserProfil", auth, userCtrl.modifyUserProfil);

//route delete : deleteUserProfil
router.delete("/deleteUser", auth, userCtrl.deleteUser);

module.exports = router;
