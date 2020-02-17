const axios = require("axios");
const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipe");
const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const { hashPassword, checkHashed } = require("../lib/hashing");

const dataRecipes = []; //Array vacio para guardar objetos recetas
const dataIngredients = []; //Array vacio para guardar objetos ingredientes
const dataUsers = []; //Array vacio para guardar Users

const key = process.env.KEYAPI;
const limit = 3;

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
      //Función para ir recogiendo cada ingredients
      createIngredients(dataRecipesload.data);

      //Función para ir recogiendo cada receta e ingredients
      createRecipes(dataRecipesload.data, dataIngredients);

      //Si id de las recetas coincide con el limit accedemos a base de datos y la creamos COLECCIONES
      if (id == limit) {
        //Función para crear USERS
        createUsers();

        withDbConnection(async () => {
          await Ingredients.deleteMany();
          await Recipes.deleteMany();
          await Users.deleteMany();
          await Ingredients.create(dataIngredients);
          await Recipes.create(dataRecipes);
          await Users.create(dataUsers);
        });
      }
    })
    .catch(err => console.log(err));
}

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
  //console.log("dataIngredients", dataIngredients);

  let ingredientsID = Ingredients.map(ingredient => ingredient.id);

  // Recoger datos requeridos Receta
  const objRecipe = {
    title: data.title,
    time: data.readyInMinutes,
    servings: data.servings,
    types: data.dishTypes,
    ingredients: ingredientsID,
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
