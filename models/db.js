const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.DEV_DB_URL;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
