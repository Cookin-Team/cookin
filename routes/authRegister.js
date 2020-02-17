const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");

// Show the list celebrity in celebrity/index
router.get("/", async (req, res, next) => {
  res.render("auth/register");
});

router.post("/", async (req, res, next) => {
  const { username, password, name, lastname } = req.body;
  const existingUser = await Users.findOne({ username });
  if (!existingUser) {
    await Users.create({
      username,
      name,
      lastname,
      password: hashPassword(password),
      rol: "subscriptors"
    });
    res.redirect("/");
  } else {
    res.render("auth/register");
  }
});

module.exports = router;
