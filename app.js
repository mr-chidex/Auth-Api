const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(PORT, console.log(`server running on PORT - ${PORT}`));
