const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: { type: String, unique: true }
  },
  {
    timestamps: true
  }
);

const Ingredients = mongoose.model("Ingredients", ingredientSchema);

module.exports = Ingredients;
