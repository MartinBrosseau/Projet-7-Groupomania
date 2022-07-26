require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookie = require("cookie-session"); //gestion et sécurisation des cookies
const keygrip = require("keygrip");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const dataBaseConnection = require("./config/dataBase");

dataBaseConnection;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//Keygrip sert vérifier nos cookie grâce a une clé sécurisée
keylist = require("keygrip");
keylist = ["SEKRIT3", "SEKRIT2", "SEKRIT1"];

const cookieExpire = new Date(Date.now() + 3600000);
app.use(
  cookie({
    name: "session",
    keys: keygrip(keylist),
    secret: process.env.SEC_SES,
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000",
      expires: cookieExpire,
    },
  })
);

app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
