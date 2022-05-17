const pool = require('../models/db')

module.authUser = (req, res, next) => {
  try {

    if (!req.headers.authorization)
      return res.status(401).json({ message: "No authorization header" });

    if (!req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "Invalid token format" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decodedToken = JWT.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) return res.status(403).json({ message: "access denied" });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [decodedToken?.id])
    req.user = user.rows[0];
    next();

  } catch (error) {
    next(error)
  }
}