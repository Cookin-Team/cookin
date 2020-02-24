const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

/* GET blog page */
router.get("/", async (req, res, next) => {
  try {
    const recipe = await Recipe.find()
      .limit(10)
      .sort("createdAt")
      .populate("ingredients");
    res.render("blog", { recipe });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
