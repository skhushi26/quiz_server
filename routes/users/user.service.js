const bcrypt = require("bcrypt");

const response = require("../../helpers/response");
const UserModel = require("./user.model");

exports.userRegistration = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password, mobile_no } =
      req.body;
    const isUsernameExists = await UserModel.findOne({ username: username });
    if (!isUsernameExists) {
      const hash = await bcrypt.hash(password, 10);
      const userData = await UserModel.create({
        first_name,
        last_name,
        email,
        username,
        password: hash,
        mobile_no,
      });
      const newUserData = await userData.toJSON();
      delete newUserData.password;
      response(res, null, newUserData, "User registered successfully", 200);
    } else {
      response(res, null, null, "This username already exists", 400);
    }
  } catch (error) {
    response(res, null, error, "Something went wrong in registration!!", 500);
  }
};
