const bcrypt = require("bcrypt");

const response = require("../../helpers/response");
const getJwt = require("../../helpers/jwt");
const UserModel = require("./user.model");

exports.userRegistration = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password, mobile_no } =
      req.body;
    const isEmailExists = await UserModel.findOne({ email: email });
    if (!isEmailExists) {
      const hash = await bcrypt.hash(password, 10);
      const userData = await UserModel.create({
        first_name,
        last_name,
        email,
        password: hash,
        mobile_no,
      });
      const newUserData = await userData.toJSON();
      delete newUserData.password;
      response(res, null, newUserData, "User registered successfully", 200);
    } else {
      response(res, null, null, "This user already exists", 400);
    }
  } catch (error) {
    response(res, null, error, "Something went wrong in registration!!", 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const payload = { user_id: user._id, role: user.role };
        const authToken = getJwt(payload);
        const newUserData = user.toJSON();
        delete newUserData.password;
        response(
          res,
          null,
          { ...newUserData, authToken },
          "User logged in successfully",
          200
        );
      } else {
        response(res, null, null, "Invalid credentials", 400);
      }
    } else {
      response(res, null, null, "User doesn't exists", 400);
    }
  } catch (error) {
    response(res, null, error, "Something went wrong!!", 500);
  }
};
