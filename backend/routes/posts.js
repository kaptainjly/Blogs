import express from "express";
import pool from "../db.js";

const router = express.Router();

/* GET all posts */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

/* GET single post */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );

    const comments = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
      [id]
    );

    res.json({
      ...post.rows[0],
      comments: comments.rows
    });
  } catch (err) {
    console.error("GET /posts/:id error:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

/* POST new post */
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *",
      [title, content, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /posts error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

/* POST comment for a post */
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { name, comment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (post_id, name, comment) VALUES ($1, $2, $3) RETURNING *",
      [id, name, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /posts/:id/comments error:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
});
// UPDATE post
router.put("/:id", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const result = await pool.query(
      "UPDATE posts SET title=$1, content=$2, author=$3 WHERE id=$4 RETURNING *",
      [title, content, author, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM posts WHERE id=$1", [req.params.id]);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;  
