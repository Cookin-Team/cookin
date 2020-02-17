const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

// Logout
router.get("/", isLoggedIn(), async (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
