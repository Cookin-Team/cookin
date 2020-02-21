const express = require("express");
const router = express.Router();
const withDbConnection = require("../withDbConnection");
const Recipe = require("../models/Recipe");

const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

/* GET recipes page */
router.get("/recetas", async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    const mealType = recipes.map(recipe => recipe.type);
    console.log("A Q U Í =>> recetas", recipes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
