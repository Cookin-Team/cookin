const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

// Login
router.get("/", isLoggedOut(), (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/",
  isLoggedOut(),
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" })
);

module.exports = router;
