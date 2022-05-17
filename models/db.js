const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.DEV_DB_URL;

const pool = new Pool({
  connectionString,
  dialect: "postgresql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = pool;
