const axios = require("axios");
const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipe");
const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const { hashPassword, checkHashed } = require("../lib/hashing");

//creamos USER data
const dataUsers = [
  {
    username: "rvaquero@cookin.com",
    password: hashPassword("123456789"),
    name: "Rubén",
    lastname: "Vaquero",
    recipesFavourites: [],
    rol: "admin"
  },
  {
    username: "pilar@cookin.com",
    password: hashPassword("123456789"),
    name: "Pilar",
    lastname: "García",
    recipesFavourites: [],
    rol: "admin"
  },
  {
    username: "juan@gmail.com",
    password: hashPassword("123456789"),
    name: "Juan",
    lastname: "Jiménez",
    recipesFavourites: [],
    rol: "subscriptors"
  }
];

const dataRecipes = []; //Array vacio para guardar objetos recetas
const dataIngredients = []; //Array vacio para guardar objetos ingredientes
const key = process.env.KEYAPI;
const limit = 2;

//Pasamos por las limit recetas para obetener el objeto y la BASE URL
for (let id = 1; id <= limit; id++) {
  const baseURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;
  getData(baseURL, id);
}

//Obtenemos la baseURL para crear las colecciones
function getData(baseURL, id) {
  axios
    .get(baseURL)
    .then(dataRecipesload => {
      //Función para ir recogiendo cada receta e ingredients
      createConstRecipes(dataRecipesload.data);

      //Si id de las recetas coincide con el limit accedemos a base de datos y la creamos COLECCIONES
      if (id == limit) {
        withDbConnection(async () => {
          await Recipes.deleteMany();
          await Recipes.create(dataRecipes);
          await Users.deleteMany();
          await Users.create(dataUsers);
          await Ingredients.deleteMany();
          await Ingredients.create(dataIngredients);
        });
      }
    })
    .catch(err => console.log(err));
}

//creamos los distintos obj que incluimos en dataRecipes
function createConstRecipes(data) {
  // Recoger datos requeridos Ingredients

  let ingredientsSingle = data.extendedIngredients.map(ingredient => {
    return ingredient.name;
  });

  console.log("ingredientsSingle", ingredientsSingle);

  //Ingredient Object

  ingredientsSingle.forEach(ingredient => {
    const objIngredient = {
      name: ingredient
    };
    dataIngredients.push(objIngredient);
  });

  // Recoger datos requeridos Receta

  let ingredientsArray = data.extendedIngredients.map(ingredient => {
    return {
      name: ingredient.name,
      quantity:
        ingredient.measures.metric.amount +
        " " +
        ingredient.measures.metric.unitShort
    };
  });
  const objRecipe = {
    title: data.title,
    time: data.readyInMinutes,
    servings: data.servings,
    types: data.dishTypes,
    ingredients: ingredientsArray,
    description: data.instructions,
    imageSrc: data.image
  };
  dataRecipes.push(objRecipe);
}
