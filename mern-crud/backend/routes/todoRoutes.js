const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// CREATE
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.json(todo);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
