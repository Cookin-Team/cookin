const axios = require("axios");
const withDbConnection = require("../withDbConnection");

const Users = require("../models/User");
const { hashPassword, checkHashed } = require("../lib/hashing");

//creamos USER data
let dataUsers = [
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
    rol: "subscriber"
  }
];

withDbConnection(async () => {
  await Users.deleteMany();
  await Users.create(dataUsers);
});
