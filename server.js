const express = require("express");
const path = require("path"); //no need to install it came from node js
const mysql = require("mysql");
const dotenv = require("dotenv");
//const cookieParser = require("cookie-parser");

//Creating .env file location.
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

//Creating public directory(where we can save public files)...__dirname gives the current directory
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//parse URL unicoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//parse JSON bodies as sent by api clients
app.use(express.json());

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

//Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

//Listen on port 3000
app.listen(port, () => console.log("Listening on port 3000"));
