const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");

// Show the list celebrity in celebrity/index
router.get("/", async (req, res, next) => {
  res.render("auth/register");
});

module.exports = router;
