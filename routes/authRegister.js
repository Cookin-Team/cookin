const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");
const passport = require("passport");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

// Register
router.get("/", isLoggedOut(), async (req, res, next) => {
  res.render("auth/register");
});

router.post("/", isLoggedOut(), async (req, res, next) => {
  const {
    username,
    password,
    name,
    lastname,
    street,
    city,
    country
  } = req.body;
  const existingUser = await Users.findOne({ username });
  if (!existingUser) {
    const newUser = await Users.create({
      username,
      name,
      lastname,
      street,
      city,
      country,
      password: hashPassword(password)
    });
    req.login(newUser, () => {
      req.user.visits += 1;
      req.user.save();
      return res.redirect("/about");
    });
  } else {
    const modalStatus = "true";
    const titleModal = "Attention:";
    const messageModal = "A user already exists for this email, please login.";
    res.render("auth/login", { modalStatus, titleModal, messageModal });
  }
});

module.exports = router;
