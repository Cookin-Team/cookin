const axios = require("axios");
const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipe");
//const Users = require("../models/User");
const Ingredients = require("../models/Ingredient");
const { hashPassword, checkHashed } = require("../lib/hashing");

const recipeData = require("../data/recipe.json"); //trae data

let dataUsers = []; //Array vacio para guardar Users

const key = process.env.KEYAPI;
const limit = 1;

//Pasamos por las limit recetas para obetener el objeto y la BASE URL
for (let id = 1; id <= limit; id++) {
  //const baseURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`;
  getData(recipeData);
}

//Obtenemos la baseURL para crear las colecciones
//function getData(baseURL, id) {
// axios
// .get(baseURL)
//.then(dataRecipesload => {

function getData(baseURL) {
  //Función para ir recogiendo cada ingredients
  createIngredientsAndRecipes(recipeData);

  //Función para crear USERS
  createUsers();
}

//creamos Ingredients
function createIngredientsAndRecipes(data) {
  // Recoger datos requeridos Ingredients
  let ingredientsList = data.extendedIngredients.map(ingredient => {
    return ingredient.name;
  });

  //Ingredient array objects
  const dataIngredients = ingredientsList.map(ingredients => {
    return {
      name: ingredients
    };
  });

  //console.log("dataIngredients", dataIngredients);

  withDbConnection(async () => {
    await Ingredients.create(dataIngredients);

    await getIdIngredients();

    function getIdIngredients() {
      let ingredientsID = dataIngredients.map(ingredient => {
        return findIngredientsId(ingredient).then(ingredient => {
          console.log(ingredient.id, "ingredient.id");
          return ingredient.id;
        });
      });
      console.log("ingredientsID", ingredientsID);

      async function findIngredientsId(ingredient) {
        let ingredientFound = await Ingredients.findOne({
          name: ingredient.name
        });
        //console.log("ingredientFound", ingredientFound);
        return ingredientFound;
      }
    }

    // dataIngredients.forEach(ingredient => {
    //   console.log(ingredient.name);
    //   Ingredients.findOne({ name: ingredient.name })
    //     .then(ingredientFound => {
    //       //console.log(ingredientFound);
    //       ingredientsID.push(ingredientFound._id);
    //     })
    //     .then(() => {
    //       console.log("ingredientsID interior", ingredientsID);
    //     });
    // });

    const dataRecipe = {
      title: data.title,
      time: data.readyInMinutes,
      servings: data.servings,
      types: data.dishTypes,
      //ingredients: ingredientsID,
      description: data.instructions,
      imageSrc: data.image
    };

    await Recipes.create(dataRecipe);
  });
}

//creamos USER data
function createUsers() {
  return (dataUsers = [
    {
      username: "rvaquero@cookin.com",
      password: hashPassword("123456789"),
      name: "Rubén",
      lastname: "Vaquero",
      street: "Calle Betron Ramírez nº10",
      city: "Madrid",
      country: "España",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "admin"
    },
    {
      username: "pilar@cookin.com",
      password: hashPassword("123456789"),
      name: "Pilar",
      lastname: "García",
      street: "Bajada de la Libertad 23",
      city: "Madrid",
      country: "España",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "admin"
    },
    {
      username: "juan@gmail.com",
      password: hashPassword("123456789"),
      name: "Juan",
      lastname: "Jiménez",
      street: "Calle Luisa Lucas 51",
      city: "Barcelona",
      country: "España",
      recipesFavourites: [],
      ingredientsList: [],
      rol: "subscriptors"
    }
  ]);

  withDbConnection(async () => {
    await Users.deleteMany();
    await Users.create(dataUsers);
  });
}
