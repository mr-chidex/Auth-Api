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

app.use("/api/v1", require("./routes/users"));

app.use((error, _, res, __) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (_, res) => {
  res.json({
    name: "mr-chidex",
    github: "https://github.com/mr-chidex",
  });
});

app.listen(PORT, console.log(`server running on PORT - ${PORT}`));
