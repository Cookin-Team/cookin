const express = require("express");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

/* ADD post favorite recipe */
router.post("/add-favorite/:id", isLoggedIn(), async (req, res, next) => {
  try {
    console.log("entraback");
    const { id } = req.params;
    const userActiveId = req.user.id;
    const recipeFavorite = await Recipe.findById(id);
    await User.findByIdAndUpdate(userActiveId, {
      $addToSet: { recipesFavorites: recipeFavorite }
    });
    res.json({ error: false });
  } catch (error) {
    console.log("error");
    next(error);
  }
});

/* GET favorite recipe page */
router.get("/favorites", isLoggedIn(), async (req, res, next) => {
  try {
    const idUser = req.user._id;
    const user = await User.findById(idUser)
      .populate("ingredientsList")
      .populate("recipesFavorites");
    const favoritesRecipesTotal = user.recipesFavorites.length;
    res.render("favoriteRecipes", { user, favoritesRecipesTotal });
  } catch (error) {
    next(error);
  }
});

/*  Delete favorite recipe page */
router.post(
  "/delete-favorite/:recipeid",
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const { recipeid } = req.params;
      const idUser = req.user._id;
      await User.findById(idUser)
        .then(async user => {
          const arrayListRecipes = user.recipesFavorites;
          const arrayIdsNews = await Promise.all(
            arrayListRecipes.filter(recipesUserId => {
              return recipesUserId != recipeid;
            })
          );
          await User.findByIdAndUpdate(idUser, {
            recipesFavorites: arrayIdsNews.map(recipe => recipe._id)
          });

          res.redirect("/favorites");
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
