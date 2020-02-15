const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, unique: true, index: true },
    time: Number,
    servings: Number,
    types: Array,
    ingredients: Array,
    description: String,
    imageSrc: String
  },
  {
    timestamps: true
  }
);

const Recipes = mongoose.model("Recipes", recipeSchema);

Recipes.collection.createIndexes([
  {
    key: { title: 1 },
    name: "title"
  }
]);

module.exports = Recipes;
