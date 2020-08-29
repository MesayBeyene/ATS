const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Creating environmental .env DB Connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.index = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("index", {
        message: "Please provide an email and password",
      });
    }
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          return res.status(401).render("index", {
            message: "Incorrect Email or Password",
          });
        } else {
          const id = results[0].id;

          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("The token is" + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/assignmentLog");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.registerUser = (req, res) => {
  console.log(req.body);

  const { name, status, email, password, passwordConfirm } = req.body;

  //importing DB
  db.query(
    "SELECT email FROM users WHERE email= ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        return res.render("registerUser", {
          message: "That email is already taken",
        });
      } else if (password !== passwordConfirm) {
        return res.render("registerUser", {
          message: "That password do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, status: status, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            return res.render("registerUser", {
              message: "User Registered",
            });
          }
        }
      );
    }
  );
};
