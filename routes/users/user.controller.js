const express = require("express");

const userService = require("./user.service");
const {
  userRegistrationSchema,
  userLoginSchema,
} = require("./user.validation");

const router = express.Router();

router.post(
  "/registration",
  userRegistrationSchema,
  userService.userRegistration
);

router.post("/login", userLoginSchema, userService.login);

module.exports = router;
