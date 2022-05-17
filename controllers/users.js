const pool = require("../models/db");
const { validateUser } = require("../utils/users.validate");
const { getToken } = require("../utils/authToken");
const { getHashedPass } = require("../utils/getHashedPass");

exports.register = async (req, res) => {
  const { error, value } = validateUser(req.body);

  if (error)
    return res
      .status(422)
      .json({ status: "error", message: error.details[0].message });

  let { name, email, password } = value;

  //make sure email is lower case
  email = email?.toLowerCase();

  //check if user already exist
  const userExist = await pool.query("SELECT * from users WHERE email = $1", [
    email,
  ]);

  if (userExist.rows.length > 0)
    return res.status(400).json({
      status: "error",
      message: "user with email already exist",
    });

  const hashedPassword = await getHashedPass(password);

  const user = await pool.query(
    `
      INSERT INTO users 
      (name, email, password) 
      VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );

  res.status(201).json({ user: user.rows[0] });
};
