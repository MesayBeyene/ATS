const express = require("express");

const router = express.Router();

//Connecting index.hbs
router.get("/", (req, res) => {
  res.render("index");
});

//Connecting registerUser.hbs
router.get("/registerUser", (req, res) => {
  res.render("registerUser");
});

//
// app.get("/", (req, res) => {
//   res.render("index");
// });

//Connecting assignmentLog.hbs
router.get("/assignmentLog", (req, res) => {
  res.render("assignmentLog");
});

//Connecting developerLog.hbs
router.get("/developerLog", (req, res) => {
  res.render("developerLog");
});

//Connecting generalReport.hbs
router.get("/generalReport", (req, res) => {
  res.render("generalReport");
});

module.exports = router;
