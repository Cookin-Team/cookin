const axios = require("axios");
const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipe");
const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const { hashPassword, checkHashed } = require("../lib/hashing");
const recipeData = require("../data/recipe.json");

const dataRecipes = []; //Array vacio para guardar objetos recetas
const dataIngredients = []; //Array vacio para guardar objetos ingredientes
let dataUsers = []; //Array vacio para guardar Users

const key = process.env.KEYAPI;
const limit = 3;

//Pasamos por las limit recetas para obetener el objeto y la BASE URL
for (let id = 1; id <= limit; id++) {
  // const baseURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;
  getData(recipeData, id);
  // console.log(baseURL);
}

//Obtenemos la baseURL para crear las colecciones
function getData(baseURL, id) {
  createIngredients(recipeData);

  //Función para ir recogiendo cada receta e ingredients
  createRecipes(recipeData, dataIngredients);

  //Si id de las recetas coincide con el limit accedemos a base de datos y la creamos COLECCIONES
  if (id == limit) {
    //Función para crear USERS
    createUsers();

    withDbConnection(async () => {
      await Ingredients.deleteMany();
      await Recipes.deleteMany();
      await Users.deleteMany();
      const ingredients = await Ingredients.create(dataIngredients);
      await Recipes.create(makeRelation(ingredients));
      await Users.create(dataUsers);
    });
  }
}

const makeRelation = ingredientsWithIds =>
  ingredientsWithIds.map(ingredient => ingredient._id);

//creamos Ingredients
function createIngredients(data) {
  // Recoger datos requeridos Ingredients

  let ingredientsList = data.extendedIngredients.map(ingredient => {
    return ingredient.name;
  });

  let objIngredient;

  //Ingredient Object
  ingredientsList.forEach(ingredients => {
    objIngredient = {
      name: ingredients
    };

    dataIngredients.push(objIngredient);
  });
}

//creamos Recipes
function createRecipes(data) {
  let ingredientsIDs;
  //console.log("dataIngredients", dataIngredients);

  if (dataIngredients.length >= 3) {
    ingredientsIDs = dataIngredients.map(ingredient => ingredient._id);
  }

  // Recoger datos requeridos Receta
  const objRecipe = {
    title: data.title,
    time: data.readyInMinutes,
    servings: data.servings,
    types: data.dishTypes,
    ingredients: ingredientsIDs,
    description: data.instructions,
    imageSrc: data.image
  };
  dataRecipes.push(objRecipe);
}

//creamos USER data
function createUsers() {
  return (dataUsers = [
    {
      username: "rvaquero@cookin.com",
      password: hashPassword("123456789"),
      name: "Rubén",
      lastname: "Vaquero",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "admin"
    },
    {
      username: "pilar@cookin.com",
      password: hashPassword("123456789"),
      name: "Pilar",
      lastname: "García",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "admin"
    },
    {
      username: "juan@gmail.com",
      password: hashPassword("123456789"),
      name: "Juan",
      lastname: "Jiménez",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "subscriptors"
    }
  ]);
}
