const jwt = require("jsonwebtoken");

const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10h',
  });
  return token;
};

module.exports = getToken;