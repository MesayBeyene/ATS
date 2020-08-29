const express = require("express");
const authControler = require("../controllers/auth");

const router = express.Router();

//Creating a router through (authController or ../controllers/auth )
router.post("/registerUser", authControler.registerUser);
router.post("/index", authControler.index);

module.exports = router;
