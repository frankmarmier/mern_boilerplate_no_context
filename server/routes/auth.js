const express = require("express");

const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

router.get("/current-user", (req, res, next) => {});

router.delete("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here anymore
    // console.log(req.session.currentUser);
    res.sendStatus(204);
  });
});

module.exports = router;
