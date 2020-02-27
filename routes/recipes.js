const express = require("express");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Ingredient = require("../models/Ingredient");
const uploadCloud = require("../config/cloudinary.js");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

/* GET recipes page */
router.get("/recipes", async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.render("recipesList", { recipes });
  } catch (error) {
    next(error);
  }
});

/* GET new recipe */
router.get("/add-recipes", async (req, res, next) => {
  try {
    res.render("recipes/new");
  } catch (error) {
    next(error);
  }
});

/* GET edit recipe page */
router.get("/recipes/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    Recipe.findById(id)
      .populate("ingredients")
      .then(recipe => {
        if (!recipe) {
          return res.status(404).render("not-found");
        }
        res.render("recipes/edit", { recipe });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
});

/* GET show single recipe page */
router.get("/recipes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    Recipe.findById(id)
      .populate("ingredients")
      .then(recipe => {
        if (!recipe) {
          return res.status(404).render("not-found");
        }
        res.render("recipes/show", { recipe });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
});

/* POST delete recipe */
router.post("/recipes/delete/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndRemove(id);
    res.redirect("/recipes");
  } catch (error) {
    next(error);
  }
});

/* POST add new recipe */
router.post(
  "/recipes/new",
  isLoggedIn(),
  uploadCloud.single("recipepic"),
  async (req, res, next) => {
    try {
      const { title, time, servings, description, ingredients } = req.body;
      const imgPath = req.file.url;
      const imgName = req.file.originalname;
      const arrIngredients = ingredients.split("|").map(id => id.trim());

      const ids = await Promise.all(
        arrIngredients
          .filter(ing => ing)
          .map(ingredient => {
            return Ingredient.findOneAndUpdate(
              { name: ingredient },
              { name: ingredient },
              {
                new: true,
                upsert: true
              }
            );
          })
      );

      const dataRecipe = {
        title: title,
        time: time,
        servings: servings,
        ingredients: ids.map(ingredient => ingredient._id),
        description: description,
        imgName: imgName,
        imageSrc: imgPath
      };

      const newRecipe = new Recipe(dataRecipe);
      await newRecipe.save();
      res.redirect("/recipes");
    } catch (error) {
      next(error);
    }
  }
);

/* POST edit recipe */
router.post(
  "/recipes/edit/:id",
  isLoggedIn(),
  uploadCloud.single("recipepic"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const imgPath = req.file.url;
      const imgName = req.file.originalname;
      let recipeIngredients = req.body.ingredients;
      let newIngredients = recipeIngredients.split("|").map(id => id.trim());

      const ids = await Promise.all(
        newIngredients
          .filter(ing => ing)
          .map(ingredient => {
            return Ingredient.findOneAndUpdate(
              { name: ingredient },
              { name: ingredient },
              {
                new: true,
                upsert: true
              }
            );
          })
      );

      const dataRecipe = {
        title: req.body.title,
        time: req.body.time,
        servings: req.body.servings,
        ingredients: ids.map(ingredient => ingredient._id),
        description: req.body.description,
        imgName: imgName,
        imageSrc: imgPath
      };

      Recipe.findByIdAndUpdate(id, dataRecipe, { new: true })
        .populate("ingredients")
        .then(recipe => {
          if (!recipe) {
            return res.status(404).render("not-found");
          }
          res.render("recipes/show", { recipe });
        })
        .catch(next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
