const jwt = require("jsonwebtoken");

module.exports = getJwt;

function getJwt(payload, expireTime = "9h") {
  const options = {
    expiresIn: expireTime,
    audience: "basicquiz",
    algorithm: "HS256",
  };
  return jwt.sign(payload, process.env.SECRET, options);
}
