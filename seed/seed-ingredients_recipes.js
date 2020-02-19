const axios = require("axios");
const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipe");
const Ingredients = require("../models/Ingredient");

const key = process.env.KEYAPI;
const limit = 20;

//Pasamos por las limit recetas para obetener el objeto y la BASE URL
for (let id = 1; id <= limit; id++) {
  const baseURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;
  getData(baseURL);
}

//Obtenemos la baseURL para crear las colecciones
function getData(baseURL) {
  axios.get(baseURL).then(dataRecipesload => {
    const data = dataRecipesload.data;

    const createOneRecipe = async recipe => {
      let ingredientsCreatePromises = recipe.extendedIngredients.map(
        ingredient =>
          Ingredients.findOneAndUpdate({ name: ingredient.name }, ingredient, {
            upsert: true
          })
      );

      const ingredients = await Promise.all(ingredientsCreatePromises);

      const ingredientsIDs = ingredients.map(ingredient => ingredient._id);

      const dataRecipe = {
        title: recipe.title,
        time: recipe.readyInMinutes,
        servings: recipe.servings,
        types: recipe.dishTypes,
        ingredients: ingredientsIDs,
        description: recipe.instructions,
        imageSrc: recipe.image
      };

      return await Recipes.findOneAndUpdate(
        { title: dataRecipe.title },
        dataRecipe,
        {
          upsert: true
        }
      );
    };

    withDbConnection(async () => {
      await createOneRecipe(data);
    });
  });
}
