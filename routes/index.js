const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET about page */
router.get("/about", (req, res, next) => {
  res.render("about");
});

/* GET profile page */
router.get("/profile", isLoggedIn(), (req, res, next) => {
  res.render("profile");
});

//Editar profile y actualizar
router.post("/edit/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, name, lastname, street, city, country } = req.body;
    await Users.findByIdAndUpdate(id, {
      username,
      name,
      lastname,
      street,
      city,
      country
    });
    res.redirect("/profile");
  } catch (err) {
    res.send(`error: ${err}`);
    next();
  }
});

/* GET Users ADMIN page LIST */
router.get("/usuarios", isLoggedIn(), async (req, res, next) => {
  try {
    const usersList = await Users.find();
    const usersTotal = usersList.length;
    res.render("profile-admin", { usersList, usersTotal });
  } catch (err) {
    res.send(`error: ${err}`);
    next();
  }
});

//Delete Users ADMIN page LIST
router.post("/usuarios/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundObjFromId = await Users.findById(id);
    await Users.findByIdAndRemove(foundObjFromId);
    res.redirect("/usuarios");
  } catch (err) {
    res.send(`error: ${err}`);
    next();
  }
});

//Editar Users ADMIN page LIST
router.post("/usuarios/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    await Users.findByIdAndUpdate(id, {
      rol
    });
    console.log("rol", rol);
    res.redirect("/usuarios");
  } catch (err) {
    res.send(`error: ${err}`);
    next();
  }
});

module.exports = router;
