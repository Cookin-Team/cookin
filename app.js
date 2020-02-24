require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { setLog } = require("@faable/flogg");
setLog("express-passport");

const dbUrl = process.env.DBURL;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${dbUrl}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  session({
    secret: "keyboard cookin",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

require("./passport")(app);

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerHelper("ifequal", function(conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("checkplural", function(v1, v2, options) {
  if (v1 > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// default value for title local
app.locals.title = "COOKIN";

const authRegister = require("./routes/authRegister");
app.use("/register", authRegister);

const authLogin = require("./routes/authLogin");
app.use("/login", authLogin);

const authLogout = require("./routes/authLogout");
app.use("/logout", authLogout);

const recipes = require("./routes/recipes");
app.use("/", recipes);

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
