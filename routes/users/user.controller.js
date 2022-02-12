const express = require("express");

const userService = require("./user.service");
const { userRegistrationSchema } = require("./user.validation");

const router = express.Router();

router.post(
  "/registration",
  userRegistrationSchema,
  userService.userRegistration
);

module.exports = router;
