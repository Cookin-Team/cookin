const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: { type: String, unique: true, index: true }
  },
  {
    timestamps: true
  }
);

const Ingredients = mongoose.model("Ingredients", ingredientSchema);

Ingredients.collection.createIndexes([
  {
    key: { name: 1 },
    name: "name"
  }
]);

module.exports = Ingredients;
