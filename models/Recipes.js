const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, index: true }
  },
  {
    timestamps: true
  }
);

const Recipes = mongoose.model("Recipes", userSchema);

Recipes.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username"
  }
]);

module.exports = Recipes;
