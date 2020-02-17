const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, index: true },
    password: String,
    name: String,
    lastname: String,
    recipesFavourites: Array,
    ingredientsList: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }],
    rol: String
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
