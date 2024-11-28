const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/error-constructors/UnauthorizedError");
const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new UnauthorizedError("Not authorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Not authorized"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
