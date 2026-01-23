const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "rashik@123",
  database: "zencreations",
});

module.exports = pool;