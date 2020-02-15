const withDbConnection = require("../withDbConnection");
const Recipes = require("../models/Recipes");

const dataCel = [];

withDbConnection(async () => {
  //await Celebrity.collection.drop();
  await Recipes.deleteMany();
  await Recipes.create(dataCel);
});
