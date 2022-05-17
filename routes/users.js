const expressPromise = require("express-promise-router");
const router = expressPromise();

const { authUser } = require("../middlewares/auth");

const {
  register,
  login,
  getAllUsers,
  getUser,
} = require("../controllers/users");

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/users").get(authUser, getAllUsers);
router.route("/users/:userId").get(authUser, getUser);

module.exports = router;
