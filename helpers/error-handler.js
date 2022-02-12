const response = require("./response");
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    response(res, null, null, err, 400);
  } else if (err.name === "Unauthorized" || err.name === "UnauthorizedError") {
    // jwt authentication error
    response(res, err.response, null, err.message, 401);
  } else if (err.name === "NotFound") {
    response(res, err.response, null, err.message, 404);
  } else {
    // default to 500 server error
    response(res, err.response, null, err.message, 500);
  }
}
