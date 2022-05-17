const bcryptjs = require("bcryptjs");

const pool = require("../models/db");
const { validateUser } = require("../utils/users.validate");
const { getToken } = require("../utils/authToken");
const { getHashedPass } = require("../utils/getHashedPass");

/**
 *
 * @access - Public
 * @desc - register a user
 * @route - POST /api/v1/register
 */
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
  const userExist = await pool.query(
    "SELECT email from users WHERE email = $1",
    [email]
  );

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

  res.status(201).json({ status: "success", user: user.rows[0] });
};

/**
 *
 * @access - Public
 * @desc - login a user
 * @route - POST /api/v1/login
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  //check if email is correct
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email?.toLowerCase(),
  ]);

  if (!user.rows.length > 0)
    return res
      .status(400)
      .json({ status: "error", message: "email or password is incorrect" });

  const userDetails = user.rows[0];

  //check if password is correct
  const isMatch = await bcryptjs.compare(password, userDetails?.password);
  if (!isMatch)
    return res
      .status(400)
      .json({ status: "error", message: "email or password is incorrect" });

  const token = getToken(userDetails);
  res.json({
    status: "success",
    name: userDetails.email,
    email: userDetails.email,
    token,
  });
};

/**
 *
 * @access - Private
 * @desc - get all users
 * @route - POST /api/v1/users
 */
exports.getAllUsers = async (_, res) => {
  const users = await pool.query("SELECT * FROM users");

  res.json({ status: "success", users: users.rows });
};

/**
 *
 * @access - Private
 * @desc - get single user
 * @route - POST /api/v1/users/:userId
 */
exports.getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await pool.query("SELECT * FROM users WHERE id =  $1", [userId]);

  if (!user.rows.length > 0)
    return res
      .status(400)
      .json({ status: "error", message: "user with id does not exist" });

  res.json({ status: "success", user: user.rows[0] });
};
