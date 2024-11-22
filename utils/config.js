const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = { JWT_SECRET };

const mongoServerAddress = "mongodb://127.0.0.1:27017/recipe-collection-db";

module.exports = { mongoServerAddress };
