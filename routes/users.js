const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middelware");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.signupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;