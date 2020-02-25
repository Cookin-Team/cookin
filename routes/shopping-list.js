const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const User = require("../models/User");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

/* GET shopping list page */
router.get("/shopping-list/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("ingredientsList");
    const ingredientsTotal = user.ingredientsList.length;
    res.render("shopping-list", { user, ingredientsTotal });
  } catch (error) {
    next(error);
  }
});

/* DELETE INGREDIENT list page */
router.post(
  "/ingredientlist/delete/:IngredientListid",
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const { IngredientListid } = req.params;
      const idUser = req.user._id;
      await User.findById(idUser)
        .then(async user => {
          const arrayListIngredient = user.ingredientsList;
          const arrayIdsNews = await Promise.all(
            arrayListIngredient.filter(ingredientUserId => {
              return ingredientUserId != IngredientListid;
            })
          );
          await User.findByIdAndUpdate(idUser, {
            ingredientsList: arrayIdsNews.map(ingredient => ingredient._id)
          });
          user = await User.findById(idUser).populate("ingredientsList");
          const ingredientsTotal = user.ingredientsList.length;
          res.render("shopping-list", { user, ingredientsTotal });
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

/* Add shopping list ingredient */
router.post(
  "/recipes/shopping-list/:Recipeid/:Userid",
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const { Recipeid, Userid } = req.params;
      Recipe.findById(Recipeid)
        .then(recipe => {
          if (!recipe) {
            return res.status(404).render("not-found");
          }
          const ingredientsArray = recipe.ingredients;
          User.findById(Userid)
            .then(user => {
              const ingredientUser = user.ingredientsList;

              ingredientsArray.forEach(ingredientId => {
                if (!ingredientUser.includes(ingredientId)) {
                  ingredientUser.push(ingredientId);
                }
              });

              return User.findByIdAndUpdate(Userid, {
                ingredientsList: ingredientUser
              }).then(async userPromise => {
                await userPromise;
                res.redirect(`/recipes/${Recipeid}`);
              });
            })
            .catch(next);
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
