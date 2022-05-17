const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user.id,
      iss: "mr-chidex",
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
