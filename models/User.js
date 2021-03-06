const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, index: true },
    password: String,
    name: String,
    lastname: String,
    street: String,
    city: String,
    country: String,
    recipesFavorites: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
    ingredientsList: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }],
    visits: { type: Number, default: 0 },
    rol: { type: String, default: "subscriber" }
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model("Users", userSchema);

Users.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username"
  }
]);

module.exports = Users;
