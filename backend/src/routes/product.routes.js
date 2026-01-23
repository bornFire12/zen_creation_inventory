const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { categoryid, name, price } = req.body;

  const result = await db.query(
    "INSERT INTO product (categoryid, name, price) VALUES ($1,$2,$3) RETURNING *",
    [categoryid, name, price]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;
  const { categoryid } = req.query;

  let query = `
    SELECT p.*, c.name AS categoryname
    FROM product p
    JOIN category c ON c.categoryid = p.categoryid
  `;
  let params = [];
  let where = "";

  if (categoryid) {
    where = " WHERE p.categoryid = $1 ";
    params.push(categoryid);
  }

  query += where + " ORDER BY p.productid LIMIT $2 OFFSET $3";
  params.push(limit, offset);

  const data = await db.query(query, params);

  res.json({
    page,
    limit,
    data: data.rows,
  });
});

router.put("/:id", async (req, res) => {
  const { name, price, categoryid } = req.body;

  const result = await db.query(
    `UPDATE product
     SET name=$1, price=$2, categoryid=$3
     WHERE productid=$4
     RETURNING *`,
    [name, price, categoryid, req.params.id]
  );

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM product WHERE productid=$1", [req.params.id]);
  res.json({ message: "Product deleted" });
});

module.exports = router;