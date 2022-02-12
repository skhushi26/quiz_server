module.exports = response;

function response(res, error, data, message, statusCode = 200) {
  res.status(statusCode).json({ error, data, message, statusCode });
}
