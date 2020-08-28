const express = require("express");
const path = require("path"); //no need to install it came from node js
const mysql = require("mysql");
const dotenv = require("dotenv");
//const cookieParser = require("cookie-parser");

//Creating .env file location.
dotenv.config({ path: "./.env" });

const app = express();
const port = 8080;

//Creating public directory(where we can save public files)...__dirname gives the current directory
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//Creating environmental .env DB Connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//Connecting DB
db.connect((error) => {
  if (error) {
    console.log("Error");
  } else {
    console.log("MySQLDB Connected");
  }
});

//Connecting HTML pages
app.set("view engine", "hbs");

//Connecting index.hbs
app.get("/", (req, res) => {
  res.render("index");
});

//Connecting assignmentLog.hbs
app.get("/assignmentLog", (req, res) => {
  res.render("assignmentLog");
});

//Connecting developerLog.hbs
app.get("/developerLog", (req, res) => {
  res.render("developerLog");
});

//Connecting generalReport.hbs
app.get("/generalReport", (req, res) => {
  res.render("generalReport");
});

//Listen on port 8080
app.listen(port, () => console.log("Listening on port 8080"));
