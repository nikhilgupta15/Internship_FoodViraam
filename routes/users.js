const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user");
router.use(cors());

var jwtToken = process.env.SECRET_KEY || "random";

router.post("/register", (req, res) => {
  let userData;
  userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };
          let token = jwt.sign(payload, jwtToken, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          // Passwords don't match
          res.json("Password don't match");
        }
      } else {
        res.json("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

router.post("/changePassword", async (req, res) => {
  const email = req.body.email;
  const currPassword = req.body.currPassword;
  const newPassword = req.body.newPassword;
  await User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(currPassword, user.password)) {
          // Passwords match
          bcrypt.hash(newPassword, 10, async (err, hash) => {
            user.password = hash;
            await user
              .save()
              .then(() => res.json({ msg: "Password Changed Successfully" }))
              .catch((err) => res.status(400).json("Error: " + err));
          });
        } else {
          // Passwords don't match
          res.json({ msg: "Please enter correct current password" });
        }
      } else {
        res.json({ msg: "user does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
