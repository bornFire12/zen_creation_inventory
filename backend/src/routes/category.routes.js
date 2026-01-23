const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const result = await db.query(
    "INSERT INTO category (name, description) VALUES ($1,$2) RETURNING *",
    [name, description]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;

  const data = await db.query(
    "SELECT * FROM category ORDER BY categoryid LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  const total = await db.query("SELECT COUNT(*) FROM category");

  res.json({
    page,
    limit,
    total: total.rows[0].count,
    data: data.rows,
  });
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  const result = await db.query(
    "UPDATE category SET name=$1, description=$2 WHERE categoryid=$3 RETURNING *",
    [name, description, id]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM category WHERE categoryid=$1", [req.params.id]);
  res.json({ message: "Category deleted" });
});

module.exports = router;